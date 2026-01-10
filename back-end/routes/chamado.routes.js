import express from 'express'
import { criarChamado, listarChamados, editarChamado } from '../controllers/chamado.controller.js';
import { verificarToken } from '../middlewares/auth.middleware.js';
const router = express.Router();

router.get('/', /*verificarToken,*/ listarChamados);
router.post('/criar', /*verificarToken,*/ criarChamado);
router.patch('/editar-chamado/:id', /*verificarToken,*/ editarChamado)

export default router;