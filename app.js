const express = require('express');

const app = express();
const mongoose = require('mongoose');
const sauceRoutes = require('./routes/sauces');
const userRoutes = require('./routes/users.js');
const path = require('path');



mongoose.connect('mongodb+srv://fredimp:et2tcmdp@cluster0.hbuylt5.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connexion ok'))
    .catch(() => console.log('conexion raté'));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
app.use(express.json());
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);

app.use('/images', express.static(path.join(__dirname, 'images')));



module.exports = app;