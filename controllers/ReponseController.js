const Question = require('../models/Question');
const Reponse = require('../models/Reponse');
const User = require('../models/User');
const mongoose = require('mongoose'); 

const ReponseController = {
    //bach imchi reponse page 
  getRepondrePage: async (req, res) => {
    try {
      const questionId = req.params.questionId;//ID question
      const question = await Question.findById(questionId);//question
      const responses=await Reponse.find({question_id:questionId}).populate([
        "user_id",
        "question_id"
      ])

      if (!question) {
        //ila mal9ahach
        return res.status(404).send('Question non trouvée');
      }
      const user = req.session.user; 
      // Afficher question
      res.render('question',{question,user,responses});
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la récupération de la question', error: error.message });
    }
  },

//post repondre
  postRepondre: async (req, res) => {
    try { 
      const id=req.params.id
      const {reponse} = req.body; // reponse hadi
      const user = req.session.user; 

      const date=new Date();
      // objet de reponse
      const newReponse = new Reponse({
        user_id:user.id,
        question_id:id,
        response: reponse ,
        date
      });

      const savedReponse = await newReponse.save();

      //res.status(201).json(savedReponse);
      // Redirige vers la page d'accueil après avoir répondu (modifiez selon votre structure)
      res.status(201).redirect(`/repondre/${id}`);
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la soumission de la réponse', error: error.message });
    }
  },
};

module.exports = ReponseController;
