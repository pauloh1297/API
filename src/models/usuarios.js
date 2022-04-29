var mongoose = require('mongoose')
var Schema = mongoose.Schema

var UsuarioSchema = new Schema({
    login: { type: String, require: true, unique: true },
    senha: { type: String, require: true },
    datacricao: { type: Date, default: Date.now() }
})

module.exports = mongoose.model('usuarios', UsuarioSchema)