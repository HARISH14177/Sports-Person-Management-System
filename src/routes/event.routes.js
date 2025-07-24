import express from 'express';
import {createEvent,getAllEvents,getEventById,updateEvent,deleteEvent} from '../controllers/event.controller.js'
const router = express.Router();
router.post('/createEvent',createEvent)
router.get('/getAllEvents',getAllEvents)
router.get('/getEventById/:id',getEventById)
router.put('/updateEvent/:id',updateEvent)
router.delete('/deleteEvent/:id',deleteEvent)

export default router;