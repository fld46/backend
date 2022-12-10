const mongoose = require('mongoose');
const mongooseError = require('mongoose-errors');
const uniqueValidator = require('mongoose-unique-validator') // Importation du module unique-validator pour verifier par la suite que l'email du compte est unique

const userSchema = mongoose.Schema({

    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

});
userSchema.plugin(mongooseError);
userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User', userSchema);