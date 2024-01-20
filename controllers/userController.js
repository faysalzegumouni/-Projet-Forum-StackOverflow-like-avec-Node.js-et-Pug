const bcrypt = require('bcrypt');
const User=require('../models/User');

/****add new user***********/

const addUser=async(req,res)=>{
    try{
        const{nom,email,password}=req.body;
        const existingUser= await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:'cet email est deja ulitise.'});
        }
        //crypter mot de passe
        const hashedPassword=await bcrypt.hash(password,10);
        const newUser=new User({
            nom,
            email,
            password:hashedPassword
        });
        const savedUser=await newUser.save();
        return res.redirect('/login');
        //res.status(201).json({message:'utlisateur cree avec succes.',user: savedUser });
    }catch(error){
        res.status(500).json({message:'Erreur lors de la creation de l\'utilisateur',error: error.message});
    }
}


/*****************login***** */


const login =async(req,res)=>{
    const{email,password}=req.body;
    try{
        const user=await User.findOne({email});
        if(!user){
          return res.status(404).json({message:'Utilisateur non trouvé.'});
        }
        const passwordMatch=await bcrypt.compare(password,user.password);
        if(passwordMatch){
            req.session.user = {
                email: user.email,
                nom: user.nom,
                id: user._id, 
            };
            return res.redirect(`/home1?email=${user.email}&nom=${user.nom}&id=${user._id}`);
        }else{
            return res.status(401).render('login', { errorMessage: 'Mot de passe incorrect.' });
        }
    }catch(error){
    res.status(500).json({message:'Erreur lors de la connexion',error: error.message});
    }
};
module.exports={addUser,login};