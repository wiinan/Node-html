var Userdb = require('../model/model');

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: 'connection nao pode ser vazia' })
        return;
    }
    const user = new Userdb({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status
    })
    user.save(user).then(data => {
        // res.send(data)
        res.redirect('/')
    }).catch(error => {
        res.status(500).send({ message: error.message || 'Algum erro ocorreu durante a criacao' })
    })
}

exports.find = (req, res) => {
    if (req.query.id) {
        const id = req.query.id;
        Userdb.findById(id).then(data => {
            if (!data) {
                res.status(404).send({ message: 'Not found user with id' + id })
            } else {
                res.send(data)
            }
        }).catch(error => {
            res.status(500).send({ message: 'erro ai pegar o id ' + id })
        })
    } else {
        Userdb.find().then(user => {
            res.send(user)
        }).catch(error => {
            res.status(500).send({ message: error.message || 'Erro ao adiquirir informações' })
        })
    }
}

exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({ message: 'Valor Invalido' })
    }
    const id = req.params.id
    Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
        if (!data) {
            res.status(404).send({ message: `não podemos atualizar o id: ${id}` })
        } else {
            res.send(data)
        }
    }).catch(error => {
        res.status(500).send({ message: 'Erro ao atualizar informacao de usuario' })
    })
}

exports.delete = (req, res) => {
    const id = req.params.id;
    Userdb.findByIdAndDelete(id).then(data => {
        if (!data) {
            res.status(404).send({ message: `Não podemos deletar o id ${id}` })
        } else {
            res.send({ message: 'Usuario Deletado com sucesso' })
        }
    }).catch(error => {
        res.status(500).send({ message: 'Não foi possivel Deletar o id' + id })
    })
}