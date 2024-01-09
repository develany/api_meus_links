const usuarioRepository = require("../repositories/usuariosRepositorys");

const emailExist = async (req, res, next) => {
    const email = req.body.email;
    try {
        const usuario = await usuarioRepository.buscarPorEmail(email);
        if (usuario) {
            return res.status(400).json({ mensagem: "email já cadastrado" });
        }
        next();
    } catch (error) {
        return res.status(500).send(error);
    }

}
module.exports = emailExist;