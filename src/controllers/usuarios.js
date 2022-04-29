var Usuarios = require('../models/usuarios');

var jwt = require('jsonwebtoken')

exports.incluir = (req, res) => {
    // #swagger.tags = ['Usuário']   
    // #swagger.description = 'Incluir um usuário'

    Usuarios.create(req.body, (erro, data) => {
        if (erro) {
            console.log('Erro a salvar o usuário: ' + erro)
            res.status(500).send('Erro a salvar o usuário: ' + erro)
        }
        else {
            console.log('Usuário cadastrado com sucesso!!! ' + data)
            res.status(201).send('Usuário cadastrado com sucesso!!!')
        }
    })
}

exports.login = (req, res) => {
    // #swagger.tags = ['Usuário']   
    // #swagger.description = 'Login de usuário'

    var login = req.body.login;
    var senha = req.body.senha;

    Usuarios.find({ login, senha }, (err, data) => {
        if (err) {
            res.status(500).send({ Mensagem: 'Erro ao fazer login do usuário: ' + err })
        }
        else if (data[0] !== undefined) {
            //Gerar o jwt e devolver para o client
            var token = jwt.sign({ id: login }, '12731', { expiresIn: '1m' })

            res.status(200).send({ Token: token })
        }
        else {
            res.status(500).send({ Mensagem: 'Usuário ou senha inválidos!!' })
        }

    })
}