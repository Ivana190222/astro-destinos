import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import crypto from 'crypto';

const prisma = new PrismaClient();

// Configuración de nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false // Permite conexiones a servidores sin certificados válidos (solo para desarrollo)
  }
});

// Función para probar la conexión al servidor SMTP
const testEmailConnection = async () => {
  try {
    const testResult = await transporter.verify();
    console.log('Conexión al servidor de correo exitosa:', testResult);
    return true;
  } catch (error) {
    console.error('Error al conectar con el servidor de correo:', error);
    return false;
  }
};

// Probar la conexión al iniciar
testEmailConnection();

// Registrar nuevo usuario
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validación básica
    if (!name || !email || !password) {
      return res.status(400).json({
        error: 'Todos los campos son requeridos',
        details: {
          name: !name ? 'El nombre es requerido' : null,
          email: !email ? 'El email es requerido' : null,
          password: !password ? 'La contraseña es requerida' : null
        }
      });
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: 'Email inválido',
        details: { email: 'Por favor, ingresa un email válido' }
      });
    }

    // Validar longitud de contraseña
    if (password.length < 6) {
      return res.status(400).json({
        error: 'Contraseña inválida',
        details: { password: 'La contraseña debe tener al menos 6 caracteres' }
      });
    }

    // Verificar si el email ya existe
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return res.status(400).json({
        error: 'El email ya está registrado',
        details: { email: 'Este email ya está en uso' }
      });
    }

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear usuario
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      }
    });

    // Generar token JWT
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    // Enviar respuesta exitosa
    return res.status(201).json({
      message: 'Usuario registrado exitosamente',
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      },
      token
    });

  } catch (error) {
    console.error('Error en registro:', error);
    return res.status(500).json({
      error: 'Error al registrar usuario',
      details: error.message
    });
  }
};

// Iniciar sesión
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validación básica
    if (!email || !password) {
      return res.status(400).json({
        error: 'Email y contraseña son requeridos',
        details: {
          email: !email ? 'El email es requerido' : null,
          password: !password ? 'La contraseña es requerida' : null
        }
      });
    }

    // Buscar usuario
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return res.status(401).json({
        error: 'Credenciales inválidas',
        details: { email: 'Email o contraseña incorrectos' }
      });
    }

    // Verificar contraseña
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({
        error: 'Credenciales inválidas',
        details: { password: 'Email o contraseña incorrectos' }
      });
    }

    // Generar token JWT
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    // Enviar respuesta exitosa
    return res.json({
      message: 'Login exitoso',
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      },
      token
    });

  } catch (error) {
    console.error('Error en login:', error);
    return res.status(500).json({
      error: 'Error al iniciar sesión',
      details: error.message
    });
  }
};

// Obtener usuario actual
export const getMe = async (req, res) => {
  try {
    // El middleware auth ya ha verificado el token y agregado el usuario al request
    return res.json({
      user: {
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
      }
    });
  } catch (error) {
    console.error('Error al obtener perfil:', error);
    return res.status(500).json({ 
      error: 'Error al obtener perfil',
      details: error.message 
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Validar que se proporcionó un email
    if (!email) {
      return res.status(400).json({
        error: 'El email es requerido',
        details: { email: 'Por favor, ingresa tu dirección de email' }
      });
    }

    // Buscar usuario
    const user = await prisma.user.findUnique({
      where: { email }
    });

    // No revelar si el usuario existe o no por seguridad
    if (!user) {
      // En producción no deberíamos revelar que el usuario no existe
      // Por ahora, enviamos el mensaje genérico
      return res.status(200).json({
        message: 'Si tu email está registrado, recibirás instrucciones para restablecer tu contraseña'
      });
    }

    // Generar token de restablecimiento
    const resetToken = crypto.randomBytes(32).toString('hex');
    // Fecha de expiración del token (1 hora)
    const resetTokenExpiry = new Date(Date.now() + 3600000); 

    // En una implementación completa, guardaríamos este token en la base de datos
    // Aquí podríamos añadir campos resetToken y resetTokenExpiry al modelo User
    // y actualizar el usuario con:
    // await prisma.user.update({
    //   where: { id: user.id },
    //   data: { resetToken, resetTokenExpiry }
    // });

    // URL del frontend desde variables de entorno
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3001';
    const resetLink = `${frontendUrl}/auth/new-password?token=${resetToken}&email=${email}`;

    // Configurar el correo electrónico
    const mailOptions = {
      from: process.env.EMAIL_FROM || `"AstroDestinos" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Restablecer tu contraseña - AstroDestinos',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
          <h1 style="color: #6d28d9; text-align: center;">Restablecer tu contraseña</h1>
          <p>Hola ${user.name},</p>
          <p>Has solicitado restablecer tu contraseña. Haz clic en el siguiente enlace para crear una nueva contraseña:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetLink}" style="background-color: #6d28d9; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">Restablecer contraseña</a>
          </div>
          <p>Este enlace expirará en 1 hora.</p>
          <p>Si no solicitaste restablecer tu contraseña, puedes ignorar este mensaje.</p>
          <p>Saludos,</p>
          <p>Equipo de AstroDestinos</p>
          <hr style="border: 1px solid #e0e0e0; margin: 20px 0;">
          <p style="font-size: 12px; color: #666; text-align: center;">Este es un correo automático, por favor no respondas.</p>
        </div>
      `
    };

    console.log('Enviando correo a:', email);
    console.log('Enlace de restablecimiento:', resetLink);

    // Enviar el correo
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Email enviado:', info.response);
      return res.status(200).json({
        message: 'Se ha enviado un correo electrónico con instrucciones para restablecer tu contraseña'
      });
    } catch (emailError) {
      console.error('Error al enviar email:', emailError);
      return res.status(500).json({
        error: 'Error al enviar el correo electrónico',
        details: emailError.message
      });
    }

  } catch (error) {
    console.error('Error en restablecimiento de contraseña:', error);
    return res.status(500).json({
      error: 'Error al procesar la solicitud',
      details: error.message
    });
  }
};

export const newPassword = async (req, res) => {
  try {
    const { token, email, password } = req.body;

    // Validar campos requeridos
    if (!token || !email || !password) {
      return res.status(400).json({
        error: 'Todos los campos son requeridos',
        details: {
          token: !token ? 'Token inválido' : null,
          email: !email ? 'Email inválido' : null,
          password: !password ? 'Contraseña inválida' : null
        }
      });
    }

    // En una implementación completa, verificaríamos el token en la base de datos
    // como: const user = await prisma.user.findFirst({
    //   where: { 
    //     email,
    //     resetToken: token,
    //     resetTokenExpiry: { gt: new Date() }
    //   }
    // });
    // 
    // if (!user) {
    //   return res.status(400).json({
    //     error: 'Token inválido o expirado',
    //     details: { token: 'Este enlace ya no es válido' }
    //   });
    // }

    // Por ahora, solo verificamos que el usuario exista
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return res.status(400).json({
        error: 'Usuario no encontrado',
        details: { email: 'No existe un usuario con este email' }
      });
    }

    // Hash de la nueva contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Actualizar contraseña y limpiar tokens de restablecimiento
    await prisma.user.update({
      where: { id: user.id },
      data: { 
        password: hashedPassword,
        // resetToken: null,
        // resetTokenExpiry: null
      }
    });

    // Enviar email de confirmación
    const mailOptions = {
      from: process.env.EMAIL_FROM || `"AstroDestinos" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Contraseña actualizada - AstroDestinos',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
          <h1 style="color: #6d28d9; text-align: center;">Contraseña actualizada</h1>
          <p>Hola ${user.name},</p>
          <p>Tu contraseña ha sido actualizada correctamente.</p>
          <p>Si no realizaste este cambio, por favor contacta con nosotros inmediatamente.</p>
          <p>Saludos,</p>
          <p>Equipo de AstroDestinos</p>
          <hr style="border: 1px solid #e0e0e0; margin: 20px 0;">
          <p style="font-size: 12px; color: #666; text-align: center;">Este es un correo automático, por favor no respondas.</p>
        </div>
      `
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log('Email de confirmación enviado a:', email);
    } catch (emailError) {
      console.error('Error al enviar email de confirmación:', emailError);
      // No devolvemos error si falla el email de confirmación
    }

    return res.status(200).json({
      message: 'Contraseña actualizada correctamente'
    });

  } catch (error) {
    console.error('Error al actualizar contraseña:', error);
    return res.status(500).json({
      error: 'Error al actualizar la contraseña',
      details: error.message
    });
  }
}; 