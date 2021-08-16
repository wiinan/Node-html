const axios = require('axios');

exports.homeRoutes = (req, res) => {
    axios.get('http://localhost:3000/api/users').then(response => {
        res.render('index', { users: response.data })
        console.log(response.data)
    }).catch(error => {
        res.send(error)
    })
}

exports.add_user = (req, res) => {
    res.render('add_user')
}

exports.update_user = (req, res) => {
    axios.get('http://localhost:3000/api/users', { params: { id: req.query.id } }).then(function (userdata) {
        res.render('update_user', { user: userdata.data })
    }).catch(error => {
        res.send(error)
    })
}