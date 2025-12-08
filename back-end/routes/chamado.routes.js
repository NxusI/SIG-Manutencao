import express from 'express'
import { criarChamado, listarChamados } from '../controllers/chamado.controller.js';
import { verificarToken } from '../middlewares/auth.middleware.js';
const router = express.Router();

router.get('/lista', verificarToken, listarChamados);
router.post('/criar', verificarToken, criarChamado);

export default router;