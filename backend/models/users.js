const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
	email: {
    type: String, 
    required: true, 
    unique: true,
    validate: {
      validator: function(v) {
       if (/<script>|<script\/>|SELECT|FROM|=/g.test(v)) {
         return false;
       }else{return true}
      },
      message: 'Caractères interdits, veuillez rentrez un email valide'
    }
  },
  password: {
    type: String, 
    required: true,
  },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);