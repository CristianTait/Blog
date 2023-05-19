const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
}, { collection: 'users' }); // Especificar el nombre de la colección como "users"

const User = mongoose.model('User', userSchema);

module.exports = User;