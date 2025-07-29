import express from 'express';
import cors from 'cors';

import authRoutes from './routes/auth.routes.js';
import gymRoutes from './routes/gym.routes.js';
import eventRoutes from './routes/event.routes.js';
import athleteRoutes from './routes/athlete.route.js'; 
import disciplineRoutes from './routes/discipline.route.js';
import athleteScoreRoutes from './routes/athletescore.route.js'


const app = express();
app.use(express.json()); 
app.use(cors());


app.use('/api/auth', authRoutes);
app.use('/api/gym', gymRoutes);
app.use('/api/event', eventRoutes);
app.use('/api/athlete', athleteRoutes);
app.use('/api/discipline', disciplineRoutes);
app.use('/api/athletescore',athleteScoreRoutes);
export default app;
