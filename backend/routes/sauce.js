const express = require('express');
const router = express.Router();

const Sauce = require('../models/Sauce'); 

/*
app.post('/api/auth/login', (req, res, next) => {
    console.log('Param envoyés par le client', req.body.email, req.body.password)
    console.log('Param envoyés dans le body', JSON.stringify(req.body))
        res.status(200).json({userId:'12345', token:'68454dqfeezgzeq68g4BZV35B4ffzgzeG546'});
    }); 
*/    
    
router.post('/', (req, res, next) => { 
    delete req.body._id; 
    const sauce = new Sauce({ 
        ...req.body
    }); 
    sauce.save() 
     .then(() => res.status(201).json({ message: 'Objet enregistré !'})) 
     .catch(error => res.status(400).json({ error })); 
     console.log(req.body); 
});    
    
    
router.get('/:id', (req, res, next) => { 
    Sauce.findOne({ _id: req.params.id })    
      .then(sauce => res.status(200).json(sauce))    
      .catch(error => res.status(404).json({ error }));   
}); 
   
    
router.put('/:id', (req, res, next) => {
    Sauce.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet modifié !'}))
      .catch(error => res.status(400).json({ error }));
});
   

router.delete('/:id', (req, res, next) => {
    Sauce.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
      .catch(error => res.status(400).json({ error }));
});


router.get('/', (req, res, next) => { 
    Sauce.find()  
      .then(sauces => res.status(200).json(sauces))
      .catch(error => res.status(400).json({ error }));  
}); 
    
    
module.exports = router;