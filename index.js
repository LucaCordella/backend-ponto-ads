let express = require('express');
let app = express();

const port = 3000;

const sequelize = require('./config/db');
const Usuario = require('./models/usuario');
const Ponto = require('./models/ponto');

const cors = require('cors');


app.use(express.json());
app.use(cors());


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
    res.send(`Usuário com id ${req.params.id_usuario} removido com sucesso`)
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


//Rotas: atualiza um ponto específico e deleta um ponto específico


app.listen(port, () => {
    console.log(`servidor escutando a porta ${port}`);
});