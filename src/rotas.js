const express = require('express');
const usuarioController = require("./controllers/usuariosController");
const auth = require("./middlewares/auth");
const validateUserBody = require('./middlewares/validateUserBody');
const schemaUser = require('./validations/schemaUser');
const emailExist = require('./middlewares/emailExist');
const schemaLogin = require('./validations/schemaLogin');
const schemaLink = require('./validations/schemaLink');


const rotas = express.Router();

rotas.get('/usuarios', usuarioController.buscar)
rotas.get('/usuarios/:id', usuarioController.buscarPeloId)

rotas.post('/usuarios', validateUserBody(schemaUser), emailExist, usuarioController.criar)

rotas.post('/usuarios/login', validateUserBody(schemaLogin), usuarioController.logar)

rotas.get('/usuarios/:id/links', usuarioController.buscarLinkPeloId)
rotas.post('/links/:id', auth.verifyToken, validateUserBody(schemaLink), usuarioController.criarLink)
rotas.put('/links/:id_link', auth.verifyToken, usuarioController.atualizarLink)
rotas.delete('/links/:id_link', auth.verifyToken, usuarioController.deletarLink)



module.exports = rotas