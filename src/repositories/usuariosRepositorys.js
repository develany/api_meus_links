const postgres = require('postgres');
require('dotenv').config();

let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;

const sql = postgres({
    host: PGHOST,
    database: PGDATABASE,
    username: PGUSER,
    password: PGPASSWORD,
    port: 5432,
    ssl: 'require',
    connection: {
        options: `project=${ENDPOINT_ID}`,
    },
});


const usuarios = async () => {

    const resposta = await sql`SELECT nome_de_usuario as nome, email FROM usuarios`;
    return resposta;

};

const buscarPorId = async (id) => {
    const resposta = await sql`SELECT * FROM usuarios WHERE id = ${id}`;
    return resposta[0];

};

const novoUsuario = async (usuario) => {
    await sql`INSERT INTO usuarios (nome_de_usuario, email, senha)
               VALUES (${usuario.nome}, ${usuario.email}, ${usuario.senha})`;
};


const buscarPorEmail = async (email) => {

    const resposta = await sql`SELECT * FROM usuarios WHERE email = ${email}`;
    return resposta[0];

};

const buscarPorToken = async (token) => {
    const resposta = await sql`SELECT * FROM usuarios WHERE token = ${token}`;
    return resposta[0];
};

const atualizarToken = async (id, token, expiracaoToken) => {

    await sql`UPDATE usuarios
            SET token = ${token}, expiracao_token = ${expiracaoToken}
            WHERE id = ${id}`;

};

const buscarLinkId = async (id) => {

    const resposta = await sql`SELECT * FROM links WHERE usuario_id = ${id}`;
    return resposta;
};


const criarLink = async (link, id) => {
    await sql`INSERT INTO links (titulo, url, usuario_id)
               VALUES (${link.titulo}, ${link.url}, ${id})`;

};
const atualizarLink = async (link, id_link) => {
    await sql`UPDATE links
               SET titulo = ${link.titulo}, url = ${link.url}
               WHERE id = ${id_link}`;

};
const deletarLink = async (id_link) => {
    await sql`DELETE FROM links WHERE id = ${id_link}`;

};
module.exports = {
    sql,
    usuarios,
    novoUsuario,
    buscarPorId,
    buscarPorEmail,
    atualizarToken,
    buscarPorToken,
    buscarLinkId,
    criarLink,
    atualizarLink,
    deletarLink
};
