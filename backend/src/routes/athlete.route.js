import express from 'express';
import {createAthelete,getAllAthlete,getAthleteById,updateAthlete,athleteCategory} from '../controllers/athlete.controller.js'
const router = express.Router();
router.post('/createAthelete', createAthelete);
router.get('/getAllAthlete', getAllAthlete);
router.get('/getAthleteById/:id', getAthleteById);
router.put('/updateAthlete/:id', updateAthlete);
router.get('/athleteCategory', athleteCategory);
export default router;

