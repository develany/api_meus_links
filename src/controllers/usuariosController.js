const usuarioService = require("../services/usuariosSevice");
const bcrypt = require("bcrypt");
const auth = require("../middlewares/auth");


const buscar = async (req, res) => {
    try {
        const resposta = await usuarioService.buscar()

        res.send(resposta);
    } catch (error) {
        res.status(404).json({ mensagem: 'erro ao buscar os usuários' });
    }
};
const buscarPeloId = async (req, res) => {
    try {
        const { id } = req.params
        const resposta = await usuarioService.buscarId(id)

        if (!resposta) {
            res.status(404).json({ mensagem: 'usuário não encontrado' });
        }
        res.send(resposta);

    } catch (error) {
        res.status(404).json({ mensagem: 'usuário não encontrado' });
    }
};
const criar = async (req, res) => {

    try {
        const usuario = req.body
        usuario.senha = await bcrypt.hash(usuario.senha, 12);
        await usuarioService.criar(usuario)
        res.status(201).send()
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

};
const logar = async (req, res) => {
    try {
        const { email, senha } = req.body;
        const usuario = await usuarioService.logar(email, senha);

        if (usuario) {
            const token = auth.generateToken(usuario.email);
            const expiracaoToken = new Date(Date.now() + 86400000);
            await usuarioService.atualizarToken(usuario.id, token, expiracaoToken);
            res.status(200).json({
                token: token, usuario: {
                    nome: usuario.nome_de_usuario,
                    email: usuario.email,
                    id: usuario.id
                }
            });
        } else {
            res.status(401).send({ mensagem: "Credenciais inválidas" });
        }
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};
const buscarLinkPeloId = async (req, res) => {
    try {
        const { id } = req.params
        const resposta = await usuarioService.buscarLinkId(id)
        if (!resposta) {
            res.status(404).json({ mensagem: 'usuário não encontrado' });
        }
        res.send(resposta);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};
const criarLink = async (req, res) => {
    const link = req.body
    const { id } = req.params
    try {
        await usuarioService.criarLink(link, id)
        res.status(201).send()
    } catch (error) {
        res.status(500).send({ error: error.message });
    }

};
const atualizarLink = async (req, res) => {

    try {
        const link = req.body
        const { id_link } = req.params
        await usuarioService.atualizarLink(link, id_link)
        res.status(201).send()
    } catch (error) {
        res.status(500).send({ error: error.message });
    }

};
const deletarLink = async (req, res) => {

    try {
        const { id_link } = req.params
        await usuarioService.deletarLink(id_link)
        res.status(200).send()
    } catch (error) {
        res.status(500).send({ error: error.message });
    }

};
module.exports = { buscar, buscarPeloId, criar, logar, buscarLinkPeloId, criarLink, atualizarLink, deletarLink };
