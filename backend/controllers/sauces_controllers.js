const Sauce = require('../models/sauces');
const fs = require('fs');

exports.getSauces = (req, res, next) => {
  Sauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({error}));
};

exports.getOneSauces = (req, res, next) => {
  Sauce.findOne({_id: req.params.id})
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(400).json({error}));
};

exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    likes : 0,
    dislikes : 0,
    userLiked: [],
    userDisliked: []
  });
  sauce.save()
    .then(() => res.status(201).json({message: 'Sauce créée !'}))
    .catch(error => {
      fs.unlink(`images/${req.file.filename}`, () => res.status(400).json({error}));
    });
}

exports.modifySauce = (req, res, next) => {
  Sauce.findOne({_id: req.params.id})
    .then(sauce => {
      const fileName = sauce.imageUrl.split('/images/')[1];
      const sauceObject = req.file ?
        {
          ...fs.unlink(`images/${fileName}`, (error) => {error}),
          ...JSON.parse(req.body.sauce),
          imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : {...req.body};
      Sauce.updateOne({_id: req.params.id}, {...sauceObject, _id: req.params.id})
      .then(() => res.status(201).json({message: 'Sauce modifée !'}))
      .catch(error => res.status(400).json({error}));
    })
    .catch(error => res.status(400).json({error}));
}

exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({_id: req.params.id})
    .then(sauce => {
      const fileName = sauce.imageUrl.split('/images/')[1];
      fs.unlink(`images/${fileName}`, () => {
        Sauce.deleteOne({_id: req.params.id})
          .then(() => res.status(200).json({message: 'Sauce supprimée !'}))
          .catch(error => res.status(400).json({error}));
      })
    })
    .catch((error => res.status(500).json({error})));
}

exports.like = (req, res, next) => {
  const likeValue = req.body.like;
  const userId = req.body.userId;
  Sauce.findOne({_id: req.params.id})
    .then( sauce => {
      if ((likeValue != 0 ) && (sauce.usersDisliked.includes(userId) || sauce.usersLiked.includes(userId))) {
        res.status(500).json({message: 'Impossible d\'ajouté ou modifier le like !'});
      } else {
        switch(likeValue) {
          case -1:
            Sauce.updateOne(
              {_id: req.params.id}, 
              {
                $push: {usersDisliked: userId},
                $inc: {dislikes: 1}
              })
            .then(() => res.status(201).json({message: 'Dislike modifié !'}))
            .catch(error => res.status(400).json({error}));
            break;
          
          case 1:
            if (sauce.usersDisliked.includes(userId) || sauce.usersLiked.includes(userId)) {
              () => res.status(500).json({message: 'Impossible d\'ajouté ou modifier le like !'});
              break}
            Sauce.updateOne(
              {_id: req.params.id}, 
              {
                $push: {usersLiked: userId},
                $inc: {likes: 1}
              })
            .then(() => res.status(201).json({message: 'Like modifié !'}))
            .catch(error => res.status(400).json({error}));
            break;

          case 0:
            if (sauce.usersLiked.includes(userId)) {
              Sauce.updateOne(
                {_id: req.params.id}, 
                {
                  $pull: {usersLiked: userId},
                  $inc: {likes: -1}
                })
              .then(() => res.status(201).json({message: 'Like modifié !'}))
              .catch(error => res.status(400).json({error}));
            } else {
              Sauce.updateOne(
                {_id: req.params.id}, 
                {
                  $pull: {usersDisliked: userId},
                  $inc: {dislikes: -1}
                })
              .then(() => res.status(201).json({message: 'Dislike modifié !'}))
              .catch(error => res.status(400).json({error}));
            }
            break;          
        }
      }
    })
    .catch(error => res.status(500).json({error}));
}

