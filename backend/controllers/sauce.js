const Sauce = require('../models/Sauce');
const fs = require('fs');


// Créer une nouvelle sauce
exports.createSauce = (req, res, next) => { 
  const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id; 
    const sauce = new Sauce({ 
        ...sauceObject,
        // Récupérer l'image
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        // Initialiser les valeurs de like et dislike 
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersdisLiked: []
    }); 
    sauce.save() 
     .then(() => res.status(201).json({ message: 'Objet enregistré !'})) 
     .catch(error => res.status(400).json({ error })); 
     console.log(req.body); 
};


// Modifier les informations d'une sauce et mettre à jour par l'id
exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file ?
  {
    ...JSON.parse(req.body.sauce),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : { ...req.body };
    Sauce.findOneAndUpdate({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
    .then((old) => {
      let oldUrl = old.imageUrl.split('/images/')[1]
      fs.unlink(`images/${oldUrl}`, (err) => {
        if (err) throw err
      })
      res.status(200).json({ message: "Sauce modifiée !" })
    })
      .catch(error => res.status(400).json({ error }));
};


// Supprimer une sauce selon l'id utilisateur
exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then( (sauce) => {
        if (!sauce) {
          return res.status(404).json({ error: new Error('Objet non trouvé !')});
        }
        if (sauce.userId !== req.auth.userId) {
          return res.status(401).json({ error: new Error('Requête non authorisée !')});
        }
        const filename = sauce.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {    
          Sauce.deleteOne({ _id: req.params.id })
            .then( () => { res.status(200).json({ message: 'Objet supprimé !'}) })
            .catch( (error) => { res.status(400).json({ error: error }) });
        });
      })            
    .catch(error => res.status(500).json({ error }));
};


// Obtenir une sauce
exports.getOneSauce = (req, res, next) => { 
    Sauce.findOne({ _id: req.params.id })    
      .then(sauce => res.status(200).json(sauce))    
      .catch(error => res.status(404).json({ error }));   
};


// Récupérer toutes les sauces
exports.getAllSauces = (req, res, next) => { 
    Sauce.find()  
      .then(sauces => res.status(200).json(sauces))
      .catch(error => res.status(400).json({ error }));  
};


//Liker et disliker une sauce selon l'utilisateur 1 seule fois
exports.likesDislikes = (req, res, next) => {
  if (req.body.like === 1) {  
   Sauce.findOne({ _id: req.params.id })
      .then(sauce => { 
        if (sauce.usersLiked.includes(req.body.userId)) {
        Sauce.findOneAndUpdate( {_id:req.params.id}, { $inc: { likes: 0 } })
         .then(() => res.status(200).json({ message: `J'aime déjà la sauce !`}))
         .catch(error => res.status(400).json({ error }));
        }else{
         Sauce.findOneAndUpdate( {_id:req.params.id}, { $push: { usersLiked: req.body.userId }, $inc: { likes: +1 } })
         .then(() => res.status(200).json({ message: `J'aime la sauce !`}))
         .catch(error => res.status(400).json({ error }));
        }});

  } else if (req.body.like === -1) {  
    Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
        if (sauce.usersLiked.includes(req.body.userId)) {
          Sauce.findOneAndUpdate( {_id:req.params.id}, { $inc: { dislikes: 0 } })
            .then(() => res.status(200).json({ message: `Je n'aime déjà pas la sauce !`}))
            .catch(error => res.status(400).json({ error }))
        }else{
          Sauce.findOneAndUpdate( {_id:req.params.id}, { $push: { usersDisliked: req.body.userId }, $inc: { dislikes: +1 } })
            .then(() => res.status(200).json({ message: `Je n'aime pas la sauce !`}))
            .catch(error => res.status(400).json({ error }));
    }})

} else {  
    Sauce.findOne({ _id: req.params.id })
      .then(sauce => {
        if (sauce.usersLiked.includes(req.body.userId)) {
          Sauce.findOneAndUpdate( {_id:req.params.id}, { $pull: { usersLiked: req.body.userId }, $inc: { likes: -1 } })
            .then(() => res.status(200).json({ message: `Je n'ai pas donné mon avis sur la sauce !`}))
            .catch(error => res.status(400).json({ error }))
        } else if (sauce.usersDisliked.includes(req.body.userId)) {
          Sauce.findOneAndUpdate( {_id:req.params.id}, { $pull: { usersDisliked: req.body.userId }, $inc: { dislikes: -1 } })
            .then(() => res.status(200).json({ message: `Je n'ai pas donné mon avis sur la sauce !`}))
            .catch(error => res.status(400).json({ error }))
        }
      })
      .catch(error => res.status(400).json({ error }));
    }}