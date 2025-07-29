import express from 'express';
const router = express.Router();

import { createGym,getGym,gymUpdate,gymDelete } from '../controllers/gym.controller.js';



router.post('/gymCreate', createGym); 
router.get('/getGym', getGym);
router.put('/gymUpdate/:id', gymUpdate);
router.delete('/gymDelete/:id', gymDelete);

export default router;
