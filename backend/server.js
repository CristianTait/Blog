const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const jwt = require('jsonwebtoken');
const { mongoURI } = require('./config');
const routes = require('./routes/posts');
const UserController = require ('./controllers/UserController')

const app = express();

// Middleware para analizar el cuerpo de las solicitudes en formato JSON
app.use(express.json());

/*
const authenticateMiddleware = (req, res, next) => {
    // Verificar si se proporciona un token de autorización válido
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'No autorizado' });
    }
  
    try {
      // Verificar y decodificar el token
      const decodedToken = jwt.verify(token, 'miClaveSecretaSuperSegura123!');
      req.user = decodedToken;
      next();
    } catch (error) {
      return res.status(401).json({ error: 'No autorizado' });
    }
  };


// Usa el middleware personalizado para la autenticación
app.use(authenticateMiddleware);

*/
// Habilita el acceso a recursos de diferentes dominios
app.use(cors());

// Conexión a MongoDB
const client = new MongoClient(mongoURI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Conectar a MongoDB
async function connectToDatabase() {
    try {
      await client.connect();
      console.log('Conexión exitosa a MongoDB');
  
      // Verificar el estado de la conexión a la base de datos antes de llamar al controlador createUser
      if (client.topology.isConnected()) {
        app.use(routes); // Usa el enrutador después de la conexión exitosa
        app.post('/usuarios/nuevo', UserController.createUser);
  
        // Configura el puerto en el que el servidor escuchará las solicitudes
        const PORT = 3000;
        app.listen(PORT, () => {
          console.log(`El servidor está funcionando en el puerto ${PORT}`);
        });
      } else {
        console.error('Error de conexión a la base de datos');
      }
    } catch (error) {
      console.error('Error al conectar a MongoDB:', error);
      process.exit(1); // Salir del proceso si hay un error de conexión
    }
  }

connectToDatabase();