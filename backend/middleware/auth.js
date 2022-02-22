const jsonWebToken = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodeToken = jsonWebToken.verify(token, 'IV4sQGXBRllXY4y7josdx5TeY7jICgZ2');
    const userId = decodeToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw 'User ID non valable'
    }else {
      next();
    }
  }catch(error){
    res.status(403).json({error: error | '403: unauthorized request'});
  }
}