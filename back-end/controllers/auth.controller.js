import prisma from "../prismaClient.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const totalUsuarios = await prisma.usuario.count();

    if (totalUsuarios > 0) {
      const authHeader = req.headers.authorization;

      if (!authHeader) {
        return res.status(401).json({ message: "Token não fornecido." });
      }

      const parts = authHeader.split(" ");
      if (parts.length !== 2) {
        return res.status(401).json({ message: "Erro no Token." });
      }

      const [scheme, token] = parts;

      if (!/^Bearer$/i.test(scheme)) {
        return res.status(401).json({ message: "Token malformatado." });
      }

      try {
        const secret = process.env.JWT_SECRET || "segredo-super-secreto";
        const decoded = jwt.verify(token, secret);
        req.usuario = decoded;
      } catch (err) {
        return res.status(401).json({ message: "Token inválido ou expirado." });
      }

      if (req.usuario.tipo !== "GESTOR") {
        return res.status(403).json({
          message:
            "Acesso negado. Apenas gestores podem cadastrar novos usuários.",
        });
      }
    }

    const { nome, login, email, senha, tipo, idEmpresa } = req.body;

    if (!nome || !login || !email || !senha) {
      return res.status(400).json({ mensagem: "Dados inválidos ou faltando." });
    }

    const usuarioExiste = await prisma.usuario.findUnique({
      where: { email: email },
    });

    if (usuarioExiste) {
      return res.status(400).json({ message: "Email já cadastrado" });
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    const novoUsuario = await prisma.usuario.create({
      data: {
        nome,
        login,
        email,
        senhaHash,
        tipo: tipo || "TECNICO",
        idEmpresa: idEmpresa ? parseInt(idEmpresa) : null,
      },
    });

    return res.status(201).json({
      message: "Usuário cadastrado com sucesso!",
      usuario: {
        id: novoUsuario.idUsuario,
        nome: novoUsuario.nome,
        login: novoUsuario.login,
        email: novoUsuario.email,
      },
    });
  } catch (error) {
    console.error("Erro ao criar usuario", error);
    return res.status(500).json({ message: "Erro interno" });
  }
};

export const login = async (req, res) => {
  try {
    const { login, senha } = req.body;

    if (!login || !senha) {
      return res.status(400).json({ mensagem: "Dados inválidos ou faltando." });
    }

    const usuarioExiste = await prisma.usuario.findUnique({
      where: { login: login },
      include: { empresa: true },
    });

    if (!usuarioExiste) {
      return res.status(401).json({ message: "Credenciais inválidas" });
    }

    const validarSenha = await bcrypt.compare(senha, usuarioExiste.senhaHash);

    if (!validarSenha) {
      return res.status(401).json({ message: "Credenciais inválidas" });
    }

    if (usuarioExiste.ativo === false) {
      return res
        .status(403)
        .json({ message: "Acesso revogado. Contate o administrador." });
    }

    const payload = {
      idUsuario: usuarioExiste.idUsuario,
      nome: usuarioExiste.nome,
      tipo: usuarioExiste.tipo,
      email: usuarioExiste.email,
      idEmpresa: usuarioExiste.idEmpresa,
      empresa: usuarioExiste.empresa,
    };

    const segredo = process.env.JWT_SECRET || "segredo-super-secreto";
    const opcoes = { expiresIn: "8h" };
    const token = jwt.sign(payload, segredo, opcoes);

    return res.status(200).json({
      message: "Login realizado",
      token: token,
      usuario: payload,
    });
  } catch (error) {
    console.error("Erro ao logar", error);
    return res.status(500).json({ message: "Erro interno" });
  }
};

export const alterarSenha = async (req, res) => {
  try {
    const { senha, novaSenha } = req.body;
    const id = req.usuario.idUsuario;

    if (!senha || !novaSenha) {
      return res.status(400).json({ mensagem: "Dados inválidos ou faltando." });
    }

    if (senha == novaSenha) {
      return res
        .status(400)
        .json({ mensagem: "Nova senha não pode ser igual." });
    }

    const usuarioBanco = await prisma.usuario.findUnique({
      where: { idUsuario: id },
    });

    if (!usuarioBanco) {
      return res.status(401).json({ mensagem: "Usuário não encontrado." });
    }

    const senhaValida = await bcrypt.compare(senha, usuarioBanco.senhaHash);

    if (!senhaValida) {
      return res.status(401).json({ mensagem: "Senha incorreta" });
    }

    const novaSenhaHash = await bcrypt.hash(novaSenha, 10);

    await prisma.usuario.update({
      where: { idUsuario: id },
      data: { senhaHash: novaSenhaHash },
    });

    return res.status(200).json({ message: "Senha alterada com sucesso!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro interno." });
  }
};

export const editarUsuario = async (req, res) => {
  try {
    const { nome, email, tipo, idEmpresa } = req.body;
    const { id } = req.params;
    const verificaTipo = req.usuario;

    if (verificaTipo.tipo !== "GESTOR") {
      return res.status(403).json({
        message: "Acesso negado. Apenas gestores podem editar usuários.",
      });
    }

    const idInt = parseInt(id);
    if (isNaN(idInt)) {
      return res.status(400).json({ message: "ID inválido." });
    }

    if (email) {
      const emailExiste = await prisma.usuario.findUnique({ where: { email } });
      if (emailExiste && emailExiste.idUsuario !== idInt) {
        return res
          .status(400)
          .json({ message: "Email já está em uso por outro usuário." });
      }
    }

    const usuarioAtualizado = await prisma.usuario.update({
      where: { idUsuario: idInt },
      data: {
        nome: nome || undefined,
        email: email || undefined,
        tipo: tipo || undefined,
        idEmpresa: idEmpresa ? parseInt(idEmpresa) : undefined,
      },
    });

    return res.status(200).json({
      message: "Usuário atualizado com sucesso!",
      usuario: {
        id: usuarioAtualizado.idUsuario,
        nome: usuarioAtualizado.nome,
        email: usuarioAtualizado.email,
        tipo: usuarioAtualizado.tipo,
      },
    });
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }
    console.error("Erro ao editar:", error);
    return res.status(500).json({ message: "Erro interno." });
  }
};

export const removerUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const usuarioLogado = req.usuario;

    if (usuarioLogado.tipo !== "GESTOR") {
      return res.status(403).json({ message: "Acesso negado." });
    }

    const idInt = parseInt(id);
    if (isNaN(idInt) || idInt === usuarioLogado.idUsuario) {
      return res.status(400).json({ message: "Operação inválida." });
    }

    await prisma.usuario.update({
      where: { idUsuario: idInt },
      data: {
        deletedAt: new Date(),
        ativo: false,
      },
    });

    return res.status(204).send();
  } catch (error) {
    console.error("Erro ao remover:", error);
    return res.status(500).json({ message: "Erro interno." });
  }
};

export const listarUsuarios = async (req, res) => {
  try {
    let { page = 1, limit = 10, nome, email, login, tipo } = req.query;

    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;
    const skip = (page - 1) * limit;

    const where = {
      deletedAt: null,
    };

    if (nome) {
      where.nome = {
        contains: nome,
      };
    }

    if (email) {
      where.email = {
        contains: email,
      };
    }

    if (login) {
      where.login = {
        contains: login,
      };
    }

    if (tipo) {
      where.tipo = tipo;
    }

    const usuarios = await prisma.usuario.findMany({
      skip,
      take: limit,
      where,
      orderBy: {
        idUsuario: "desc",
      },
      select: {
        idUsuario: true,
        nome: true,
        login: true,
        email: true,
        tipo: true,
        ativo: true,
        idEmpresa: true,
        empresa: true,
      },
    });

    const totalRegistros = await prisma.usuario.count({
      where,
    });

    const totalPaginas = Math.ceil(totalRegistros / limit);

    return res.status(200).json({
      data: usuarios,
      meta: {
        total: totalRegistros,
        page,
        limit,
        totalPages: totalPaginas,
      },
    });
  } catch (error) {
    console.error("Erro ao listar usuários:", error);
    return res.status(500).json({ message: "Erro interno." });
  }
};

export const alternarStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const usuarioLogado = req.usuario;

    if (usuarioLogado.tipo !== "GESTOR") {
      return res
        .status(403)
        .json({ message: "Apenas gestores podem alterar status." });
    }

    const idInt = parseInt(id);
    if (isNaN(idInt)) return res.status(400).json({ message: "ID inválido." });

    const usuarioAlvo = await prisma.usuario.findUnique({
      where: { idUsuario: idInt },
    });

    if (!usuarioAlvo)
      return res.status(404).json({ message: "Usuário não encontrado." });

    const usuarioAtualizado = await prisma.usuario.update({
      where: { idUsuario: idInt },
      data: { ativo: !usuarioAlvo.ativo },
    });

    return res.status(200).json({
      message: `Usuário ${usuarioAtualizado.ativo ? "ativado" : "inativado"} com sucesso!`,
      ativo: usuarioAtualizado.ativo,
    });
  } catch (error) {
    console.error("Erro ao alterar status:", error);
    return res.status(500).json({ message: "Erro interno." });
  }
};

export const logout = (req, res) => {
  return res.status(200).json({ message: "Logout realizado com sucesso!" });
};
