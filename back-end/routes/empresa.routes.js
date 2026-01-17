import express from 'express';
import { 
    criarEmpresa, listarEmpresas, buscarEmpresaPorId, editarEmpresa,  excluirEmpresa } from '../controllers/empresa.controller.js';
import { verificarToken } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/', verificarToken, criarEmpresa);
router.get('/', verificarToken, listarEmpresas);
router.get('/:id', verificarToken, buscarEmpresaPorId);
router.patch('/:id', verificarToken, editarEmpresa);
router.delete('/:id', verificarToken, excluirEmpresa);

export default router;