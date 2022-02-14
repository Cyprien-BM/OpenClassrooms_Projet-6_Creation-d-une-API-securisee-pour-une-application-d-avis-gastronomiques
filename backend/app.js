const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config()
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth_routes');
const saucesRoutes = require('./routes/sauces_routes');
const helmet = require('helmet');

const User = process.env.DB_USER;
const Password = process.env.DB_PASSWORD;

mongoose.connect(`mongodb+srv://${User}:${Password}@cluster0.i73sd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

app.use(helmet({
  crossOriginResourcePolicy: false,
}));

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json());

app.use('/images', express.static('images'));

app.use('/api/auth', authRoutes)
app.use('/api/sauces', saucesRoutes)

module.exports = app;