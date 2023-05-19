const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017'; // Cambia la URL de conexión si es necesario
const client = new MongoClient(uri);
app.use(cors());

// Conecta a la base de datos
client.connect((err) => {
    if (err) {
      console.error('Error al conectar a la base de datos:', err);
    } else {
      console.log('Conexión exitosa a la base de datos');
    }
  });

// Middleware para analizar el cuerpo de las solicitudes en formato JSON
app.use(express.json());

// Middleware personalizado para la autenticación (ejemplo)
const authenticateMiddleware = (req, res, next) => {
  // Lógica de autenticación
  // Si la autenticación falla, puedes enviar una respuesta de error
  if (!req.headers.authorization) {
    return res.status(401).json({ error: 'No autorizado' });
  }
  // Si la autenticación es exitosa, llama a next() para continuar con la siguiente función
  next();
};

// Usa el middleware personalizado para la autenticación
app.use(authenticateMiddleware);

// Importa el enrutador
const routes = require('./routes');

// Usa el enrutador
app.use(routes);

// Configura el puerto en el que el servidor escuchará las solicitudes
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`El servidor está funcionando en el puerto ${PORT}`);
});