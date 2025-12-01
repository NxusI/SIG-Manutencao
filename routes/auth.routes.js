import express from 'express'
import { register } from '../controllers/auth.controller.js';
import { login } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/cadastro', register);
router.post('/login', login);

export default router;