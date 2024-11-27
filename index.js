let express = require('express');
let app = express();

const port = 3000;

const sequelize = require('./config/db');
const Usuario = require('./models/usuario');
const Ponto = require('./models/ponto');

const cors = require('cors');


app.use(express.json());
app.use(cors());


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


//Rota que recupera todos os usuários do sistema
app.get('/usuarios', async (req, res) => {
    
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
});


//Rota que recupera um usuário específico  
app.get('/usuario/:id_usuario', async (req, res) => {

    const id_usuario = req.params.id_usuario;
    
    const usuario = await Usuario.findAll({
        where: {
            id_usuario: id_usuario
        }
    });
    res.json(usuario);
});


// Rota que adiciona um usuário
app.post('/usuario', async (req, res) => {
    
    const usuario = await Usuario.create({
        nome: req.body.nome,
        email: req.body.email,
        senha: req.body.senha,
        login: req.body.login
    });


    res.json(usuario);
});

//Rota que atualiza um usuário
app.put('/usuario/:id_usuario', async (req, res) => {

    //1 - Recupera o usuario de id "id_usuario" (busca no bd)
    const usuario = await Usuario.findByPk(req.params.id_usuario);

    //2 - Atualiza a istância do usuario
    const usuarioAtualizado = await usuario.update({        
        nome: req.body.nome,
        email: req.body.email,
        senha: req.body.senha,
        login: req.body.login
    });
    
    res.json(usuarioAtualizado);
});


//Rota que deleta um usuário específico
app.delete('/usuario/:id_usuario', async (req, res) => {

    //1 - Procure o usuário pela chave primaria (req.params.id_usuario) (findByPk)
    const usuario = await Usuario.findByPk(req.params.id_usuario);
    //2 - Remova a instância retornada pela busca com a chave primária (método destroy())
    usuario.destroy();
    //3 - Retorne um texto para o usuário com sucesso ou fracasso
    res.send(`Usuário com id ${req.params.id_usuario} removido com sucesso!`)
});


// Rota que cria um ponto (???)
app.post('/ponto/:id_usuario', async (req, res) => {
    const ponto = Ponto.create({
        dataHora: req.body.dataHora,
        tipo: req.body.tipo,
        userId: req.params.id_usuario // Ao invés de recuperar da url, recuperar do body
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