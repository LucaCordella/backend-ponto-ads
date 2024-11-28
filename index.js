let express = require('express');
let app = express();

const port = 3000;

const sequelize = require('./config/db');
const Usuario = require('./models/usuario');
const Ponto = require('./models/ponto');
const UsuarioRotas = require('./routes/usuario');

const cors = require('cors');


app.use(express.json());
app.use(cors());
app.use('/', UsuarioRotas);


// Um usuário pode ter muitos Pontos
Usuario.hasMany(Ponto);
// Um ponto pertence sempre a um único usuário
Ponto.belongsTo(Usuario);


sequelize.sync({ alter: true })
    .then(() => {
        console.log("sync feito com sucesso");
    })
    .catch(error => { console.log("deu erro!")
});


// Rota que cria um ponto 
app.post('/ponto', async (req, res) => {
    const ponto = await Ponto.create({
        dataHora: req.body.dataHora,
        tipo: req.body.tipo,
        userId: req.body.id_usuario 
    });
    res.send(ponto);
});


//Rota que busca todos os pontos
app.get('/ponto', async (req, res) => {
    const pontos = await Ponto.findAll();
    res.send(pontos);

});


//Rota que busca um ponto específico
app.get('/ponto/:id_ponto', async (req, res) => {
    const ponto = await Ponto.findByPk(req.params.id_ponto);
    res.send(ponto);

});


// Rota que atualiza um ponto específico (id_ponto)
app.put('/ponto/:id_ponto', async (req, res) => {
    const ponto = await Ponto.findByPk(req.params.id_ponto);
    const pontoAtualizado = ponto.update({

    });
    res.send(pontoAtualizado);
});


// Rota que deleta um ponto específico (id_ponto)
app.delete('/ponto/:id_ponto', async (req, res) => {
    const ponto = Ponto.findByPk(req.params.id_ponto);
    ponto.destroy();

    res.send(`o ponto com id ${req.params.id_ponto} foi excluido com sucesso`);
});


app.listen(port, () => {
    console.log(`servidor escutando a porta ${port}`);
});