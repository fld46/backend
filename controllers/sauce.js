const Sauce = require('../models/Sauce');

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

exports.likeSauce = (req, res, next) => {
    const like = Number(JSON.parse(req.body.like));
    const sauceId = (req.params.id);

    if (like === -1) {


    } else if (like === 0) {

    } else {

    }


};
exports.listeSauces = (req, res, next) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }));

};
exports.oneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({ error }));
};
exports.updateSauce = (req, res, next) => {
    Sauce.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
        .then(sauce => res.status(200).json({ message: 'sauce modifiée !' }))
        .catch(error => res.status(400).json({ error }));

};
exports.deleteOneSauce = (req, res, next) => {
    Sauce.deleteOne({ _id: req.params.id })
        .then(sauce => res.status(200).json({ message: 'sauce supprimée !' }))
        .catch(error => res.status(400).json({ error }));
};