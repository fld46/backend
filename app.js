const express = require('express'); // Import du module express ( pour la gestion des routes  )
require('dotenv').config(); // Import du module dotenv ( pour le stockage de certaines variable dans un fichier .env )

const app = express();
const mongoose = require('mongoose'); //Import du module mongoose ( gestion de  BDD)
//Import des differents fichiers contenant les routes
const sauceRoutes = require('./routes/sauces');
const userRoutes = require('./routes/users');
const path = require('path');
//recuperation des parametres de  la Bdd mongoose 
const mongodb = process.env.MONGODB;

//Initialisation de la connexion a la BDD
mongoose.connect(mongodb, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connexion ok'))
    .catch(() => console.log('Connexion raté'));
//Configuration des Headers pour eviter les pb de CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

//Definition des routes et du chemin  des images

app.use(express.json());
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;