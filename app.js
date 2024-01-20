const mongoose = require('mongoose');
const User = require("./models/User"); 
const express = require('express');
const session = require('express-session');
const app = express();
const routes =require('./routes/user');
const routequestion =require('./routes/QuestionRouter');
const routereponse=require('./routes/ReponseRouter');
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
//session meddlwers 
app.use(session({
  secret: 'votre_secret', // Changez cela par une chaîne aléatoire pour sécuriser les sessions
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // false si vous ne travaillez pas en HTTPS
}));
//connection database
const uri = "mongodb+srv://younnesbaloma:Faysal2020@cluster0.mxyw8hj.mongodb.net/block";

(async () => {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to db");
})();

app.use('/', routes,routequestion,routereponse);



const port = 8080;
app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});