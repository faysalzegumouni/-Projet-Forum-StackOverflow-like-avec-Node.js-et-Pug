const Question=require('../models/Question');
const QuestionController={
    createQuestion: async(req,res)=>{
        const{question}=req.body;
        const userId = req.session.user.id;
        const date=new Date();
        try{
            const newQuestion=new Question({
                user_id: userId,
                question,
                date
            })
            const savedQuestion = await newQuestion.save();
            //res.status(201).json(savedQuestion);
            res.status(201).redirect('/home1');
        }catch(error){
            res.status(500).json({message:'erreur lors de creation de question',error: error.message });
        }
    },
    getQuestions: async (req, res) => {
        try {
        const questions = await Question.find().populate('user_id')
        const user = req.session.user; 
        res.render('home', {questions,user});
        } catch (error) {
          res.status(500).json({ message: 'Erreur lors de la récupération des questions', error: error.message });
        }
      }
}
module.exports = QuestionController;