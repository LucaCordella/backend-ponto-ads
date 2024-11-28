const express = require('express');
const router = express.Router();
const Ponto = require('../models/ponto');


// Rota que cria um ponto 
router.post('/ponto', async (req, res) => {
    const ponto = await Ponto.create({
        dataHora: req.body.dataHora,
        tipo: req.body.tipo,
        userId: req.body.id_usuario 
    });
    res.send(ponto);
});


//Rota que busca todos os pontos
router.get('/ponto', async (req, res) => {
    const pontos = await Ponto.findAll();
    res.send(pontos);

});


//Rota que busca um ponto específico
router.get('/ponto/:id_ponto', async (req, res) => {
    const ponto = await Ponto.findByPk(req.params.id_ponto);
    res.send(ponto);

});


// Rota que atualiza um ponto específico (id_ponto)
router.put('/ponto/:id_ponto', async (req, res) => {
    const ponto = await Ponto.findByPk(req.params.id_ponto);
    const pontoAtualizado = ponto.update({

    });
    res.send(pontoAtualizado);
});


// Rota que deleta um ponto específico (id_ponto)
router.delete('/ponto/:id_ponto', async (req, res) => {
    const ponto = Ponto.findByPk(req.params.id_ponto);
    ponto.destroy();

    res.send(`o ponto com id ${req.params.id_ponto} foi excluido com sucesso`);
});


module.exports = router;