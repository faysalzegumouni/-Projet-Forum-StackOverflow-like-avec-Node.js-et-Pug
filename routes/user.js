const express=require('express');
const routes=express.Router();
const {addUser,login}=require('../controllers/userController')

////Route afficher le registre 
routes.get('/registre',(req,res)=>{
    res.render('registre');
})


/// Route pour poster un nouvel utilisateur depuis le formulaire registre.pug
routes.post('/register', addUser);


///// page de login
routes.get('/login',(req,res)=>{
  res.render('login');
})

/*routes.get('/home', (req, res) => {
  const user = req.session.user;
  res.render('home', { user });
});*/

// Route pour logout
routes.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Erreur lors de la déconnexion' });
    }

    res.redirect('/login');
  });
});

//route de la connexion de login
routes.post('/login',login);
module.exports = routes;
