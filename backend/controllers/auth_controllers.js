const User = require('../models/users');
const bcrypt = require('bcrypt');
const jsonWebToken = require('jsonwebtoken');

exports.signeUp = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User ({
        email: req.body.email,
        password: hash
      });
      user.save()
        .then(() => res.status(201).json({message: 'Utilisateur créé !'}))
        .catch(error => res.status(400).json({error}));
    })
    .catch(error => res.status(500).json({error}));
};

exports.login = (req, res, next) => {
  User.findOne({email: req.body.email})
    .then(user => {
      if(!user) {
        return res.status(401).json({error: 'Email non trouvé : Cette utilisateur n\'éxiste pas'});
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({error: 'Mot de passe incorrect !'})
          }
          res.status(200).json({
            userId: user._id,
            token: jsonWebToken.sign(
              {userId: user.id},
              'IV4sQGXBRllXY4y7josdx5TeY7jICgZ2',
              {expiresIn: '24h'}
            )
          });
        })
        .catch(error => res.status(500).json({error}));
    })
    .catch(error => res.status(500).json({error}));
};