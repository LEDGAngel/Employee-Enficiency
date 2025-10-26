import 'dotenv/config'
import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import { insightsRouter } from './routes/insights.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/insights', insightsRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});