const express = require('express')

var mongoose = require('mongoose');

var swaggerUI = require('swagger-ui-express');
var swaggerFile = require('./swagger_output.json');


var routeProduto = require('./src/routes/produtos');
var routeUsuario = require('./src/routes/usuarios');

var middlewares = require('./src/middlewares/middlewares');

const app = express()
const port = 3000

var url = 'mongodb+srv://paulo:123@cluster0.sn4wj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const options = {
    useNewUrlParser: true
};


mongoose.connect(url, options)

mongoose.connection.on('error', (erro) => {
    console.log('Erro ao conectar com o banco de dados: ' + erro)
})


mongoose.connection.on('connected', () => {
    console.log('Conectado ao banco de dados!!')
})




app.use(express.json())

app.get('/', (req, res) => {
    // #swagger.tags = ['Root']   
    // #swagger.description = 'End-point root da aplicação'

    console.log('Opa! Cheguei no get!!')
    res.send('Opa! Cheguei no get!!')
})

app.use('/produtos', middlewares.autenticacao, routeProduto);
app.use('/usuarios', routeUsuario);


app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerFile));

app.listen(process.env.PORT || port, () => {
    console.log('Servidor web ok!')
})

