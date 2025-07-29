import express from 'express';
import {
  createDiscipline,
  getAllDisciplines,
  getDisciplineById,
  updateDiscipline,
  deleteDiscipline
} from '../controllers/discipline.controller.js';

const router = express.Router();

router.post('/createDiscipline', createDiscipline);
router.get('/getAllDisciplines', getAllDisciplines);
router.get('/getDisciplineById/:id', getDisciplineById);
router.put('/updateDiscipline/:id', updateDiscipline);
router.delete('/deleteDiscipline/:id', deleteDiscipline);

export default router;
