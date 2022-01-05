# Janovsky_6_20122021

P6 - OPENCLASSROOMS - Créer une API sécurisée

Pour ouvrir l'application :
- lancer un premier terminal et se placer sur le back-end, puis lancer 'node server' ou 'nodemon server'
- lancer un deuxième terminal et se placer sur le frontend, puis lancer 'run npm install --save-dev run-script-os' puis 'npm start' pour lancer le frontend.

L'utilisateur pour s'inscrire sur l'application doit fournir un email ainsi qu'un mot de passe contenant : 
au moins 8 caractères avec un chiffre, une minuscule, une majuscule et pas d'espace.

Backend
Les technologies utilisées pour le back: un server NodeJS, une base de données MongoDB, le framework Express et le pack Mongoose.
Les modules utilisés : 'mongoose','path','helmet', 'express-mongo-sanitize','express-rate-limit' Version : "^5.5.1",'dotenv','jsonwebtoken','bcrypt',
'mongoose-unique-validator','email-validator','passwordValidator','fs','multer'.
