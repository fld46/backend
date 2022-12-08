//Importation du module  multer
const multer = require('multer');
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpeg',
    'image/png': 'png'
}
//Modification de l'image pour la rendre unique pour etre ensuite stockée au bon endroit 
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images')
    },
    filename: (req, file, callback) => {
        const nameimg = file.originalname.split('.')[0];
        const extension = MIME_TYPES[file.mimetype];
        const name = nameimg.split(' ').join('_').split('.' + extension);
        callback(null, name + Date.now() + '.' + extension);

    }
});

module.exports = multer({ storage }).single('image');