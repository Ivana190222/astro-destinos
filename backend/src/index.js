require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const sequelize = require('./config/database');

// Importar modelos
const User = require('./models/User');
const Reading = require('./models/Reading');

// Importar rutas
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const astroRoutes = require('./routes/astrology');
const tarotRoutes = require('./routes/tarot');
const ritualRoutes = require('./routes/rituals');

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/astrology', astroRoutes);
app.use('/api/tarot', tarotRoutes);
app.use('/api/rituals', ritualRoutes);

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Algo salió mal!' });
});

// Sincronizar la base de datos y iniciar el servidor
sequelize.sync({ alter: true })
  .then(() => {
    console.log('Base de datos sincronizada');
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en puerto ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Error sincronizando la base de datos:', err);
  }); 