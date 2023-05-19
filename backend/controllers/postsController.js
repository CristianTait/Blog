// Importa los módulos y bibliotecas necesarios
const { MongoClient } = require('mongodb');

// Configura la conexión a la base de datos
const uri = 'mongodb://localhost:27017'; // Cambia la URL de conexión si es necesario
const client = new MongoClient(uri);

// Función controladora para obtener todas las publicaciones
const getAllPosts = async (req, res) => {
  try {
    // Conecta a la base de datos
    await client.connect();

    // Accede a la colección de publicaciones
    const collection = client.db('my-blog').collection('posts');

    // Realiza la consulta para obtener todas las publicaciones
    const posts = await collection.find().toArray();

    // Envía la respuesta con las publicaciones obtenidas
    res.json(posts);
  } catch (error) {
    console.error('Error al obtener las publicaciones:', error);
    res.status(500).json({ error: 'Error al obtener las publicaciones' });
  } finally {
    // Cierra la conexión a la base de datos
    await client.close();
  }
};

// Función controladora para obtener una publicación específica por su ID
const getPostById = async (req, res) => {
    const postId = req.params.id;
  
    try {
      await client.connect();
  
      const collection = client.db('my-blog').collection('posts');
  
      const post = await collection.findOne({ _id: new ObjectId(postId) });
  
      if (post) {
        res.json(post);
      } else {
        res.status(404).json({ error: 'Publicación no encontrada' });
      }
    } catch (error) {
      console.error('Error al obtener la publicación:', error);
      res.status(500).json({ error: 'Error al obtener la publicación' });
    } finally {
      await client.close();
    }
  };
  
  // Función controladora para crear una nueva publicación
  const createPost = async (req, res) => {
    const { title, content } = req.body;
  
    try {
      await client.connect();
  
      const collection = client.db('my-blog').collection('posts');
  
      const newPost = {
        title,
        content,
        createdAt: new Date(),
      };
  
      const result = await collection.insertOne(newPost);
  
      res.json(result.ops[0]);
    } catch (error) {
      console.error('Error al crear la publicación:', error);
      res.status(500).json({ error: 'Error al crear la publicación' });
    } finally {
      await client.close();
    }
  };
  
  // Función controladora para actualizar una publicación existente por su ID
  const updatePost = async (req, res) => {
    const postId = req.params.id;
    const { title, content } = req.body;
  
    try {
      await client.connect();
  
      const collection = client.db('my-blog').collection('posts');
  
      const result = await collection.updateOne(
        { _id: new ObjectId(postId) },
        { $set: { title, content } }
      );
  
      if (result.modifiedCount > 0) {
        res.json({ message: 'Publicación actualizada correctamente' });
      } else {
        res.status(404).json({ error: 'Publicación no encontrada' });
      }
    } catch (error) {
      console.error('Error al actualizar la publicación:', error);
      res.status(500).json({ error: 'Error al actualizar la publicación' });
    } finally {
      await client.close();
    }
  };

  // Función controladora para eliminar una publicación por su ID
const deletePost = async (req, res) => {
    const postId = req.params.id;
  
    try {
      await client.connect();
  
      const collection = client.db('my-blog').collection('posts');
  
      const result = await collection.deleteOne({ _id: new ObjectId(postId) });
  
      if (result.deletedCount > 0) {
        res.json({ message: 'Publicación eliminada correctamente' });
      } else {
        res.status(404).json({ error: 'Publicación no encontrada' });
      }
    } catch (error) {
      console.error('Error al eliminar la publicación:', error);
      res.status(500).json({ error: 'Error al eliminar la publicación' });
    } finally {
      await client.close();
    }
  };

module.exports = {
  getAllPosts,
  updatePost,
  createPost,
  getPostById,
  deletePost,
  // Exporta las demás funciones controladoras
};