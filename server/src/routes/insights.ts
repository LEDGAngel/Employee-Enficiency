import { Router } from 'express';
import { generateInsights } from '../controllers/insightsController.js';

export const insightsRouter = Router();

insightsRouter.post('/generate', generateInsights);