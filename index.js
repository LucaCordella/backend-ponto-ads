let express = require('express');
let app = express();

const port = 3000;

const sequelize = require('./config/db');
const Usuario = require('./models/usuario');
const Ponto = require('./models/ponto');


app.use(express.json());


sequelize.sync({ alter: true })
    .then(() => {
        console.log("sync feito com sucesso");
    })
    .catch(error => { console.log("deu erro!")
});


//const luca = Usuario.create({ nome: "luca", email: "lucacordella12@gmail.com", login: "luca", senha: "123"});


//Rota que recupera todos os usuários do sistema
app.get('/usuarios', async (req, res) => {
    
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
});


app.get('/usuario/:id_usuario', async (req, res) => {

    const id_usuario = req.params.id_usuario;
    
    const usuario = await Usuario.findAll({
        where: {
            id_usuario: id_usuario
        }
    });

    res.json(usuario);

});


// Rota qe adiciona um usuário
app.post('/usuario', (req, res) => {
    
    
    // 1 - recuperar as informações do usuário (req.body)
    // 2 - Crirar uma entrada no BD com as informações do usuário (Usuario.create({...}))
    // 3 - Retornar para o cliente o usuário criado (res.json resultado do create))

});


app.listen(port, () => {
    console.log(`servidor escutando a porta ${port}`);
});