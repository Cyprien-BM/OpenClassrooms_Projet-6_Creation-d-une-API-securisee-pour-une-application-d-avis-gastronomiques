const mongoose = require('mongoose');


// Check if input contain forbiden char and/or string
function inputValidator (input) {
  if (/<script>|<script\/>|SELECT|FROM|=/g.test(input)) {
    return false;
  }else{return true}
}
//--------------------------------------------------------//


const sauceSchema = mongoose.Schema({
  userId: {type: String, required: true},
  name: {
    type: String, 
    required: true,
    validate: [inputValidator, 'Caractères interdits, veuillez rentrer un texte valide'],
    maxLength: 50,
  },
  manufacturer: {
    type: String, 
    required: true,
    validate: [inputValidator, 'Caractères interdits, veuillez rentrer un texte valide'],
    maxLength: 50,
  },
  description: {
    type: String, 
    required: true,
    validate: [inputValidator, 'Caractères interdits, veuillez rentrer un texte valide'],
    maxLength: 200,
  },
  mainPepper: {
    type: String, 
    required: true,
    validate: [inputValidator, 'Caractères interdits, veuillez rentrer un texte valide'],
    maxLength: 50,
  },
  imageUrl: {type: String, required: true},
  heat: {type: Number, required: true},
  likes: {type: Number, required: true},
  dislikes: {type: Number, required: true},
  usersLiked: {type: [String], required: true},
  usersDisliked: {type: [String], required: true}
});

module.exports = mongoose.model('Sauce', sauceSchema);