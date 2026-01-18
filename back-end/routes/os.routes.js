import express from 'express';
import { gerarOS, listarOS, buscarOSPorId, editarOS, finalizarOS, responderOrcamento } from '../controllers/os.controller.js';
import { verificarToken } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/gerar', verificarToken, gerarOS);       
router.get('/', verificarToken, listarOS);            
router.get('/:id', verificarToken, buscarOSPorId);    
router.patch('/editar/:id', verificarToken, editarOS);       
router.patch('/finalizar/:id', verificarToken, finalizarOS);
router.get('/resposta/:id/:resposta', responderOrcamento);

export default router;