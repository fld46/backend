//Importation des differents modules  pour recuperer la clef de cryptage et utiliser  celle-ci
require('dotenv').config();
const jwt = require('jsonwebtoken');
const Key = process.env.KEY_CRYPT;
//Verification que  l'utilisateur est bien identifié
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, Key);
        const userId = decodedToken.userId;
        req.auth = {
            userId: userId
        };
        next();
    } catch (error) {
        res.status(401).json({ error });
    }

}