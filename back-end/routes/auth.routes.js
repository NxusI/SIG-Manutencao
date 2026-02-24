import express from 'express'
import { register, removerUsuario, login, logout, alterarSenha, editarUsuario, listarUsuarios, alternarStatus } from '../controllers/auth.controller.js';
import { verificarToken } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/usuarios', verificarToken, listarUsuarios)
router.post('/cadastro', register);
router.post('/login', login);
router.post('/logout', logout);
router.patch('/alterar-senha', verificarToken, alterarSenha);
router.patch('/editar-usuario/:id', verificarToken, editarUsuario);
router.delete('/remover-usuario/:id', verificarToken, removerUsuario);
router.patch('/status/:id', verificarToken, alternarStatus);

export default router;