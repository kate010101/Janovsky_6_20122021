const express = require('express'); 

const bodyParser = require('body-parser');

const mongoose = require('mongoose'); 

const Thing = require('./models/Thing'); 

const app = express(); 

mongoose.connect('mongodb+srv://oscar-47:LIv0brian@cluster0.blprn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    { useNewUrlParser: true, 
    useUnifiedTopology: true }) 
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !')); 


app.use(express.json());



app.use((req, res, next) => { 
    res.setHeader('Access-Control-Allow-Origin', '*');   
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');   
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');   
    next();    
   }); 

app.use(bodyParser.json());
 
/*
app.use((req, res, next) => { 

 console.log('Requête reçue !'); 

 next(); 

}); 

 

app.use((req, res, next) => { 

 res.status(201); 

 next(); 

}); 

 

app.use((req, res, next) => { 

 res.json({ message: 'Votre requête a bien été reçue !' }); 

 next(); 

}); 

 

app.use((req, res, next) => { 

 console.log('Réponse envoyée avec succès !'); 

}); 

*/




app.use('/api/auth/login', (req, res, next) => {
    
    const auth =   
        {     
         email: 'aycaramba@fff.fr',
         password: 'ayayay'    
        }; 
     
      res.status(200).json(auth);
}); 


app.get('/api/sauces', (req, res, next) => { 
    Thing.find()  
      .then(things => res.status(200).json(things)) 
      .catch(error => res.status(400).json({ error }));  
}); 


app.post('/api/sauces', (req, res, next) => { 
 delete req.body._id; 
 const thing = new Thing({ 
   ...req.body 
 }); 
 thing.save() 
   .then(() => res.status(201).json({ message: 'Objet enregistré !'})) 
   .catch(error => res.status(400).json({ error })); 
});    


app.get('/api/sauces/:id', (req, res, next) => { 
    Thing.findOne({ _id: req.params.id })    
      .then(thing => res.status(200).json(thing))    
      .catch(error => res.status(404).json({ error }));   
}); 

module.exports = app; 