const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const passwordSchema = require("../utils/passwordValidator");
const emailValidator = require("email-validator");


// Pour l'inscription de l'utilisateur
exports.signup = (req, res, next) => {
  // Vérification du format de l'adresse mail
  if (!emailValidator.validate(req.body.email)) {
    return res
      .status(401)
      .json({ message: "Veuillez entrer une adresse email valide" });
  }
  // Vérification du format du mot de passe
  if (!passwordSchema.validate(req.body.password)) {
    return res
      .status(401)
      .json({
        message: `Le mot de passe doit contenir au moins 8 caractères avec un chiffre, une minuscule, une majuscule et pas d'espace`,
      });
  }
  // Utilisation de bcrypt pour hasher le mot de passe
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash
      });
    user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};


// Pour la connexion d'un utilisateur et l'attribution d'un token utilisateur
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(
              { userId: user._id },
              process.env.SECRET_TOKEN,
              { expiresIn: '24h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};