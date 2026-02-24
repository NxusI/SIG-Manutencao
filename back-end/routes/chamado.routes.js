import express from 'express'
import { criarChamado, listarChamados, editarChamado, listarStatus, buscarChamadoPorId } from '../controllers/chamado.controller.js';
import { verificarToken } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/', verificarToken, listarChamados);
router.get('/listar-status', verificarToken, listarStatus);
router.post('/criar', verificarToken, criarChamado);
router.get('/:id', verificarToken, buscarChamadoPorId);
router.patch('/editar-chamado/:id', verificarToken, editarChamado);

export default router;