import express from 'express'
import { graficoArea, graficoBarra, graficoCards, graficoPizza } from '../controllers/dashboard.controller.js';
import { verificarToken } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/cards', verificarToken, graficoCards);
router.get('/area', verificarToken, graficoArea);
router.get('/pizza', verificarToken, graficoPizza);
router.get('/barra', verificarToken, graficoBarra);

export default router;