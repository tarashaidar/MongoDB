const { Article, User } = require('../models')

function createArticle(req, res) {
    const userId = req.body.owner.id;
    User.findById(userId, (err) => {
        if (err) return res.status(404).send("User doesn't exist");
        Article.create(req.body, (err, article) => {
            if (err) res.status(500).send(err)
            User.findByIdAndUpdate(userId, { $inc: { numberOfArticles: 1 } }, (err) => {
                if (err) return res.status(404).send("Can't update User");
                res.send(article);
                console.log('Article is created');
            });
        });
    });
};

function updateArticle(req, res) {
    const id = req.params.id;
    Article.findById({ _id: id }, (err, article) => {
        if (err) return res.status(404).send("Can't find article");
        User.findById({ _id: article.owner }, (err) => {
            if (err) return res.status(404).send("User doesn't exist");
            Article.findByIdAndUpdate({ _id: id }, req.body, (err, result) => {
                if (err) return res.status(404).send("Can't update article");
                res.send(result);
                console.log(`Article with id: ${id} is updated`);
            });
        });
    });
}

function deleteArticle(req, res) {
    const id = req.params.id;
    Article.findById({ _id: id }, (err, article) => {
        if (err) return res.status(404).send("Can't find article");
        User.findById({ _id: article.owner }, (err) => {
            Article.findByIdAndRemove({ _id: article._id }, (err, article) => {
                if (err) return res.status(404).send("Can't delete article");
                User.findByIdAndUpdate({ _id: article.owner }, { $inc: { numberOfArticles: -1 } }, (err, article) => {
                    if (err) return res.status(404).send("Can't update User");
                    res.send(article)
                    console.log(`Article with id: ${article._id} is deleted`);
                });
            });
        })
    });
}

function getAllArticles(req, res) {
    Article.find(req.body, (err, article) => {
        if (err) res.send(err);
        if (article.length === 0) {
            res.send(`Article list is empty`);
        } else {
            res.send(article);
            console.log('You get information about some articles');
        }
    })
};

module.exports = { getAllArticles, createArticle, deleteArticle, updateArticle }