var mongoose = require('mongoose')
var Schema = mongoose.Schema

var ProdutoSchema = new Schema({
    codigo: { type: String, require: true, unique: true },
    nome: { type: String, require: true },
    descricao: { type: String },
    datacricao: { type: Date, default: Date.now() }
})

module.exports = mongoose.model('Produtos', ProdutoSchema)