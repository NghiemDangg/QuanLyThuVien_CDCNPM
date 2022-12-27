const User = require("../models/User");
const Book = require("../models/Book");
const CallCard = require("../models/CallCard")
const jwt = require('jsonwebtoken')
const {
    mongooseToObject,
    mutipleMongooseToObject,
} = require("../../util/mongoose");

class AdminManager {
    userManager(req, res) {
        if (!req.cookies.accessToken) {
            return res.redirect('/')
        }
        const decode = jwt.verify(req.cookies.accessToken, 'secretkey')
        User.findOne({_id: decode.id}, function(err, user) {
            if (user.type != 'admin') {
                return res.clearCookie('accessToken').redirect('/')
            }
        })
        User.find({ type: "user" })
            .then((users) => {
                res.render("admin/user", {
                    dataUser: mutipleMongooseToObject(users),
                });
            })
            .catch((err) => {
                res.send(err);
            });
    }

    deleteUser(req, res) {
        let userID = req.params.userid;
        User.deleteOne({ userid: userID })
            .then(() => {
                res.redirect("/admin/user");
            })
            .catch((err) => {
                console.log(err);
            });
    }

    bookManager(req, res) {
        if (!req.cookies.accessToken) {
            return res.redirect('/')
        }
        const decode = jwt.verify(req.cookies.accessToken, 'secretkey')
        User.findOne({_id: decode.id}, function(err, user) {
            if (user.type != 'admin') {
                return res.clearCookie('accessToken').redirect('/')
            }
        })
        Book.find({})
            .then((bookData) => {
                res.render("admin/book", {
                    bookData: mutipleMongooseToObject(bookData),
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    deleteBook(req, res) {
        let bookID = req.params.bookid;
        Book.deleteOne({ bookid: bookID })
            .then(() => {
                res.redirect("/admin/book");
            })
            .catch((err) => {
                console.log(err);
            });
    }

    deleteCallCard(req, res) {
        let cardID = req.params.cardID
        CallCard.deleteOne({idCard: cardID})
            .then(() => {
                res.redirect("/admin/callcard");
            }).catch((err) => {
                res.send(err.message);
        });
    }

    callCardManager(req, res) {
        if (!req.cookies.accessToken) {
            return res.redirect('/')
        }
        const decode = jwt.verify(req.cookies.accessToken, 'secretkey')
        User.findOne({_id: decode.id}, function(err, user) {
            if (user.type != 'admin') {
                return res.clearCookie('accessToken').redirect('/')
            }
        })
        CallCard.find({}).then((ccdata) => {
            res.render('admin/callcard1', {
                ccdata: mutipleMongooseToObject(ccdata)
            })
        }).catch(err => {
            console.status(500).send(err.message);
        })
    }
}

module.exports = new AdminManager();
