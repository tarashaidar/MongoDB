const { User, Article } = require('../models')

function createUser(req, res) {
    User.create(req.body, (err, user) => {
        if (err) res.status(500).send(err);
        res.status(200).send(user);
        console.log('User is created');
    })
}

function updateUser(req, res) {
    let id = req.params.id;
    User.findByIdAndUpdate(id, req.body, (err, user) => {
        if (err) res.status(500).send(err);
        res.status(200).send(user);
        console.log('User is updated');
    })
}

function getUser(req, res) {
    let id = req.params.id;
    User.findById(id, (err, user) => {
        if (err) res.status(500).send(err);
        res.status(200).send(user);
        console.log('You got information about User');
    })
}

function deleteUser(req, res) {
    let id = req.params.id;
    User.findByIdAndDelete(id, (err, user) => {
        if (err) res.status(500).send(err);
        res.status(200).send(user);
        console.log('User is deleted');
    })
}

function getUserArticles(req, res) {
    let id = req.params.id;
    Article.find({ owner: id })
        .populate('owner')
        .exec((id, (err, userArticles) => {
            if (err) res.status(500).send('err');
            res.status(200).send(userArticles);
            console.log(userArticles);
        }))
}

function getAllUsers(req, res) {
    User.find((err, user) => {
        if (err) res.status(500).send(err);
        res.status(200).send(user);
        console.log('You got information about all Users');
    })
}

module.exports = { createUser, updateUser, getUser, deleteUser, getUserArticles, getAllUsers }
