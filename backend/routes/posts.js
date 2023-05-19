const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController.js');

// Importa los controladores
const {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} = require('../controllers/postsController');

// Rutas para realizar operaciones CRUD en las publicaciones
router.get('/posts', getAllPosts);
router.get('/posts/:id', getPostById);
router.post('/posts', createPost);
router.put('/posts/:id', updatePost);
router.delete('/posts/:id', deletePost);

// Ruta para crear un nuevo usuario
router.post('/usuarios/nuevo', userController.createUser);

module.exports = router;