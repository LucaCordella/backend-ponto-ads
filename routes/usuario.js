const express = require('express');
const router = express.Router();
const Usuario = require('../models/usuario');


// Rota que recupera todos os usuários do sistema
router.get('/usuarios', async (req, res) => {
    
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
});


// Rota que recupera um usuário específico
router.get('/usuario/:id_usuario', async (req, res) => {
    const id_usuario = req.params.id_usuario;
    const usuario = await Usuario.findAll({
        where: {
            id_usuario: id_usuario
        }
    });
    res.json(usuario);
});


// Rota que adiciona um usuário
router.post('/usuario', async (req, res) => {
    
    const usuario = await Usuario.create({
        nome: req.body.nome,
        email: req.body.email,
        senha: req.body.senha,
        login: req.body.login
    });
    res.json(usuario);
});


// Rota que atualiza um usuário
router.put('/usuario/:id_usuario', async (req, res) => {
    // 1 - recupera o usuário de id "id_usuario" (busca no bd)
    const usuario = await Usuario.findByPk(req.params.id_usuario);
    // 2 - atualizar a instância do usuário
    const usuarioAtualizado = await usuario.update({        
        nome: req.body.nome,
        email: req.body.email,
        senha: req.body.senha,
        login: req.body.login
    });
    res.json(usuarioAtualizado);
});


// Rota que deleta um usuário específico
router.delete('/usuario/:id_usuario', async (req, res) => {
    // 1 - procure o usuário pela chave primária (req.params.id_usuario) (findByPk)
    const usuario = await Usuario.findByPk(req.params.id_usuario);
    // 2 - remova a instância retornada pela busca com a chave primária (método destroy())
    usuario.destroy();
    // 3 - retorne um texto para o usuário com sucesso ou fracasso
    res.send(`Usuário com id ${req.params.id_usuario} removid com sucesso!`)
});


module.exports = router;