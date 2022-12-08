//Importation du module password-validator
const validatorPswd = require('password-validator');
const schema = new validatorPswd();
schema
    .is().min(8)                                    // Minimum length 8
    .is().max(100)                                  // Maximum length 100
    .has().uppercase()                              // Must have uppercase letters
    .has().lowercase()                              // Must have lowercase letters
    .has().digits(2)                                // Must have at least 2 digits
    .has().not().spaces()                           // Should not have spaces
//Verification du password avec les parametre ci-dessus
module.exports = (req, res, next) => {
    const password = req.body.password;

    if (schema.validate(password)) {
        next();
    } else {
        return res.status(400).json({ error: `le mot  de passe est trop simple, il doit contenir 8 caracteres dont une majuscule, deux nombres et sans espaces` })
    }
}