//Importation du module validator
const validator = require('validator');
//Verification que l'email est correct grace au module validator
module.exports = (req, res, next) => {
    const email = req.body.email;
    if (validator.isEmail(email)) {
        next();
    } else {
        return res.status(400).json({ error: `l'email ${email} n'est pas valide` })
    }
}