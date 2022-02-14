// Check if input contain forbiden char and/or string
function inputValidator (input) {
  if (/<script>|<script\/>|SELECT|FROM|=/g.test(input)) {
    return true;
  }else{return false}
}
//----------------------------------------------------------//

module.exports = (req, res, next) => {
  if (
    inputValidator(req.body.name) ||
    inputValidator(req.body.manufacturer) ||
    inputValidator(req.body.description) ||
    inputValidator(req.body.mainPepper)
  ) {
    res.status(422).json({error : 'Caractères interdits, veuillez rentrer un texte valide'});
  } else {next()}
}
