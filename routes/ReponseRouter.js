const express = require('express');
const router = express.Router();
const ReponseController = require('../controllers/ReponseController');

router.get('/repondre/:questionId', ReponseController.getRepondrePage); // Affiche la page de réponse 
router.post('/repondre/:id', ReponseController.postRepondre); 
module.exports = router;
