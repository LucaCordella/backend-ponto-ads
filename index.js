let express = require('express');
let app = express();

const port = 3000;

const sequelize = require('./config/db');

sequelize.authenticate().then(
    console.log("conectei no banco")
).catch(error => {
    console.log("deu erro!")
});



app.get("/user/:id1-:id2", (req, res) => {
    console.log(req.params);
});

app.post("/user/:id1-:id2", (req, res) => {
    res.send(req.params);
});

app.get("/teste", (req, res) => {
    res.send("Resposta da rota /teste");
});


app.post("/rotapost", (req, res) => {
    res.send("Retorno da rota usando o método post");
});


app.listen(port, () => {
    console.log(`servidor escutando a porta ${port}`);
});