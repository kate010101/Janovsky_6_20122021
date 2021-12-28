const express = require('express'); 
const bodyParser = require('body-parser');
const mongoose = require('mongoose'); 
const path = require('path');
const helmet = require('helmet');

const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');

const app = express();

const mongoSanitize = require('express-mongo-sanitize');
const rateLimit = require('express-rate-limit');


// Utilisation de dotenv pour sécuriser les données sensibles
require('dotenv').config();

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 3, // Limite chaque IP à 3 requetes par `fenetre` (ici, par 15 minutes)
	standardHeaders: true, // Retourne l'info rate limit dans les `RateLimit-*` headers
	legacyHeaders: false, // Empeche les `X-RateLimit-*` headers
})

// Connexion à la base de données mongoDB
mongoose
  .connect(
  process.env.SECRET_MONGO,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch((e) => console.log("Connexion à MongoDB échouée !",));


// Options de sécurité et possibilités des requêtes à envoyer  
app.use((req, res, next) => { 
  res.setHeader('Access-Control-Allow-Origin', '*');   
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');   
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');   
  next();    
}); 

// Utilisation helmet pour protéger l'application de vulnérabilités
app.use(helmet());

// Traite les données en format json
app.use(express.json());

// Protége contre l'injection de requêtes NoSQL
app.use(mongoSanitize());

app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', limiter, userRoutes);



module.exports = app; 
