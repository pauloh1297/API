const res = require('express/lib/response');
const produto = require('../models/produtos');
var Produtos = require('../models/produtos');

/*
exports.incluir = async (req, res)=>{
    
}*/

//Exemplo com async/await
exports.incluir = async (req, res) => {
    // #swagger.tags = ['Produtos']   
    // #swagger.description = 'Incluir um produto'

    if (req.body.descricao === undefined) {
        return res.status(500).send({ Mensagem: 'É obrigatório informar a descrição!!' })
    }

    var codigo = req.body.codigo

    //Verificar se o registro já existe com o mesmo código

    var data = await Produtos.find({ codigo })

    if (data[0] !== undefined) {
        return res.status(500).send({ Mensagem: 'Já existe registro com esse código!!' })
    }

    //Criar o registro
    try {
       await Produtos.create(req.body)

    } catch (err) {
        return res.status(500).send('Erro a salvar o produto: ' + err)
    }

    return res.status(201).send('Produto cadastrado com sucesso!!!')

}

exports.buscar = (req, res) => {
    // #swagger.tags = ['Produtos']   
    // #swagger.description = 'Buscar um produto'

    var codigo = req.params.codigo;

    Produtos.find({ codigo }, (err, data) => {
        if (err) {
            res.status(500).send({ Mensagem: 'Erro ao buscar o produto: ' + err })
        }
        else if (data[0] !== undefined) {
            res.status(200).send(data)
        }
        else {
            res.status(204).send()
        }

    })
}

exports.listar = (req, res) => {
    // #swagger.tags = ['Produtos']   
    // #swagger.description = 'Listar produtos'


    Produtos.find({}, (err, data) => {
        if (err) {
            res.status(500).send({ Mensagem: 'Erro ao listar produtos: ' + err })
        }
        else if (data[0] !== undefined) {
            res.status(200).send(data)
        }
        else {
            res.status(204).send()
        }
    })

    /*console.log(req.query)
    res.status(200).send('Tudo ok com o método para listar o produtos! ' + req.query.nome)*/
}

exports.alterar = (req, res) => {
    // #swagger.tags = ['Produtos']   
    // #swagger.description = 'Alterar um produto'

    var codigo = req.params.codigo;

    Produtos.findOneAndUpdate({ codigo }, { $set: req.body }, (err, data) => {
        if (err) {
            res.status(500).send({ Mensagem: 'Erro ao alterar o produto: ' + err })
        } else {
            res.status(202).send()
        }
    })

    /* console.log(req.body)
     res.status(200).send('Tudo ok com o método para alterar o produto! ' + req.params.codigo)*/
}

exports.excluir = (req, res) => {
    // #swagger.tags = ['Produtos']   
    // #swagger.description = 'Excluir um produto'

    var codigo = req.params.codigo;

    Produtos.findOneAndDelete({ codigo }, (err, data) => {
        if (err) {
            res.status(500).send({ Mensagem: 'Erro ao excluir o produto: ' + err })
        } else {
            res.status(202).send()
        }
    })

    /*res.status(200).send('Tudo ok com o método para excluir o produto! ' + req.params.codigo)*/
}