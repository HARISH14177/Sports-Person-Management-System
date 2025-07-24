import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import gymRoutes from './routes/gym.routes.js'
import modelEvent from './routes/event.routes.js'
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/gym', gymRoutes);
app.use('/api/event',modelEvent)
export default app;
