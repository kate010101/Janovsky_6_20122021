const passwordValidator = require("password-validator");
const passwordSchema = new passwordValidator();

// Modèle du format de mot de passe requis
passwordSchema
  .is()
  .min(8)
  .is()
  .max(100)
  .has()
  .uppercase()
  .has()
  .lowercase()
  .has()
  .digits()
  .has()
  .not()
  .spaces();

  module.exports=passwordSchema;