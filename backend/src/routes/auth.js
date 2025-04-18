import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { body, validationResult } from 'express-validator';
import { register, login, getMe, resetPassword, newPassword } from '../controllers/authController.js';
import auth from '../middleware/auth.js';

const router = express.Router();
const prisma = new PrismaClient();

// Middleware de validación
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Validaciones
const registerValidation = [
  body('name').notEmpty().withMessage('El nombre es requerido'),
  body('email').isEmail().withMessage('Email inválido'),
  body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
];

const loginValidation = [
  body('email').isEmail().withMessage('Email inválido'),
  body('password').notEmpty().withMessage('La contraseña es requerida')
];

const resetPasswordValidation = [
  body('email').isEmail().withMessage('Email inválido')
];

const newPasswordValidation = [
  body('token').notEmpty().withMessage('Token inválido'),
  body('email').isEmail().withMessage('Email inválido'),
  body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
];

// Rutas
router.post('/register', registerValidation, validateRequest, register);
router.post('/login', loginValidation, validateRequest, login);
router.get('/me', auth, getMe);
router.post('/reset-password', resetPasswordValidation, validateRequest, resetPassword);
router.post('/new-password', newPasswordValidation, validateRequest, newPassword);

export default router; 