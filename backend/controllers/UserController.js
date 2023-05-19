const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const mongoose = require('mongoose');

const createUser = async (req, res) => {
    const { username, password } = req.body;
  
    try {
      // Verificar si el usuario ya existe
      if (!mongoose.connection.readyState) {
        return res.status(500).json({ error: 'Error de conexión a la base de datos' });
      }
      const existingUser = await User.findOne({ username }).maxTimeMS(15000);
      if (existingUser) {
        return res.status(400).json({ error: 'El usuario ya existe' });
      }
  
      // Generar un hash de la contraseña
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Crear un nuevo usuario
      const newUser = new User({ username, password: hashedPassword });
      await newUser.save();
      
      //Generar el token
      const token = jwt.sign({ userId: newUser._id }, 'miClaveSecretaSuperSegura123!', { expiresIn: '1h' });

      res.status(201).json({ message: 'Usuario creado exitosamente', token });
    } catch (error) {
      console.error('Error al crear el usuario:', error);
      res.status(500).json({ error: 'Error al crear el usuario', errorMessage: error.message });
    }
  };

  module.exports = {
    createUser,
  };