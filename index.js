const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');
const Usuario = require('./models/usuario');
const Ponto = require('./models/ponto');
const UsuarioRotas = require('./routes/usuario');
const PontoRotas = require('./routes/ponto');

const relacao = require('./models/relacao');
relacao();

const port = 3000;

const app = express();

app.use(express.json());
app.use(cors());
app.use('/', UsuarioRotas);
app.use('/', PontoRotas);


sequelize.sync({ alter: true })
    .then(() => {
        console.log("sync feito com sucesso");
    })
    .catch(error => { console.log("deu erro!")
});


app.listen(port, () => {
    console.log(`servidor escutando a porta ${port}`);
});