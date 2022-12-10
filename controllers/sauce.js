//Importation des differents modules

const Sauce = require('../models/Sauce');
const Fs = require('fs-extra');

//Fonction de creation de sauce
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({
        ...sauceObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });

    sauce.save()
        .then(() => { res.status(201).json({ message: 'sauce ajoutée' }) })
        .catch(error => res.status(400).json({ error }));
};
//Fonction de gestion des likes,  dislikes
exports.likeSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            const like = req.body.like;
            if (like === -1 && sauce.usersDisliked.indexOf(req.body.userId) === -1) {
                sauce.dislikes++;
                sauce.usersDisliked.push(req.body.userId);
                sauce.save();
            }
            if (like === 1 && sauce.usersLiked.indexOf(req.body.userId) === -1) {
                sauce.likes++;
                sauce.usersLiked.push(req.body.userId);
                sauce.save();
            }
            if (like === 0) {
                if (sauce.usersLiked.indexOf(req.body.userId) != -1) {
                    sauce.likes--;
                    sauce.usersLiked.splice(sauce.usersLiked.indexOf(req.body.userId), 1);
                } else if (sauce.usersDisliked.indexOf(req.body.userId) != -1) {
                    sauce.dislikes--;
                    sauce.usersDisliked.splice(sauce.usersDisliked.indexOf(req.body.userId), 1);
                }
                sauce.save();
            }
            res.status(200).json({ message: 'like pris en compte' })
        })
        .catch(error => {
            res.status(500).json({ error })
        });
};
//Fonction de recuperation de toutes les sauces
exports.listeSauces = (req, res, next) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }));

};
//Fonction de recuperation d'une sauce
exports.oneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({ error }));
};
//Fonction de mise a jour d'une sauce
exports.updateSauce = (req, res, next) => {

    if (req.file) {
        Sauce.findOne({ _id: req.params.id })
            .then(sauce => {
                Fs.remove('./images/' + sauce.imageUrl.split('/')[4])
                    .then(() => {
                        req.body.imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
                        Sauce.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
                            .then(sauce => res.status(200).json({ message: 'sauce modifiée !' }))
                    })
                    .catch(err => { console.error(err) })
            })
            .catch(error => res.status(400).json({ error }));

    }
    else {
        Sauce.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
            .then(sauce => res.status(200).json({ message: 'sauce modifiée !' }))
            .catch(error => res.status(400).json({ error }));
    }
};
//Fonction de  suppression d'une sauce
exports.deleteOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            Fs.remove('./images/' + sauce.imageUrl.split('/')[4])
                .then(() => { console.log('success') })

        })
        .then(sauce => {
            Sauce.deleteOne({ _id: req.params.id })
                .then(sauce => res.status(200).json({ message: 'sauce supprimée !' }))
        })
        .catch(error => res.status(400).json({ error }));

};