const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// Modèle de l'utilisateur pour l'inscription et l'identification
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// Permet d'utiliser qu'une fois une adresse mail pour un compte
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);