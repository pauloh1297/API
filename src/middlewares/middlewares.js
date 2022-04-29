var jwt = require('jsonwebtoken')


exports.autenticacao = (req, res, next) => {
    var token = req.headers.auth
    jwt.verify(token, '12731', (err, decoded) => {
        if (err) {
            res.send({ error: 'Token inválido!' + err });
        }
        else {
            console.log(decoded)
            next()
        }
    })
}
