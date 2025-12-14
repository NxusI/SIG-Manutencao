import { notEqual } from 'assert';
import prisma from '../prismaClient.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const registrar = async (req, res) => {

    const { nome, email, telefone } = req.body

    const novoCliente = await prisma.cliente.create({
        data:{
            nome,
            email,
            telefone
        }
    });

    return res.status(201).json({
            mensagem: "Cliente cadastrado com sucesso!",
            data: {
                id: novoCliente.idCliente,
                nome: novoCliente.nome,
                email: novoCliente.email,
                telefone: novoCliente.telefone
            }
    })
}

export const listarClientes = async (req, res) => {
    const clientes = await prisma.cliente.findMany()

    return res.status(200).json({
        mensagem: "Lista de clientes.",
        data: clientes
    })

}

export const editarCliente = async (req, res) => {

    const {nome, email, telefone} = req.body
    const {id} = req.params

    const idCliente = parseInt(id)

    const clienteAtualizado = await prisma.cliente.update({
        where: {
            idCliente: idCliente
        },
        data: {
            nome: nome,
            email: email,
            telefone: telefone
        }
    })

    res.status(201).json({
        message:"Cliente atualizado com sucesso",
        data: clienteAtualizado
    })


}

export const excluirCliente = async (req, res) => {
    const {id} = req.params
    const idCliente = parseInt(id)

    const clienteExcluido = await prisma.cliente.delete({
        where:{
            idCliente: idCliente
        }
    })

    res.status(200).json({
        message:"Cliente excluído com sucesso!"
    })
}