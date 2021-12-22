const express = require('express');
const router = express.Router();

const sauceCtrl = require('../controllers/sauce');

/*
app.post('/api/auth/login', (req, res, next) => {
    console.log('Param envoyés par le client', req.body.email, req.body.password)
    console.log('Param envoyés dans le body', JSON.stringify(req.body))
        res.status(200).json({userId:'12345', token:'68454dqfeezgzeq68g4BZV35B4ffzgzeG546'});
    }); 
*/    
    
router.post('/', sauceCtrl.createSauce);        
router.put('/:id', sauceCtrl.modifySauce);
router.delete('/:id', sauceCtrl.deleteSauce);  
router.get('/:id', sauceCtrl.getOneSauce); 
router.get('/', sauceCtrl.getAllSauces);    
    
module.exports = router;