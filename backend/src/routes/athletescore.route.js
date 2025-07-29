import express from 'express';
import {
  createScore,
  getAllScores,
  getScoreById,
  updateScore,
  deleteScore
} from '../controllers/athletescore.controller.js';

const router = express.Router();

router.post('/createScore', createScore);
router.get('/getAllScores', getAllScores);
router.get('/getScoreById/:id', getScoreById);
router.put('/updateScore/:id', updateScore);
router.delete('/deleteScore/:id', deleteScore);

export default router;
