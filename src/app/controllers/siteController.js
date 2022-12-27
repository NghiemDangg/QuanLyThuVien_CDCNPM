const bcrypt = require("bcrypt");
const User = require("../models/User");
const Book = require("../models/Book");
const { MongoClient } = require("mongodb");
const CallCard = require("../models/CallCard");
require("dotenv").config();
const uri = process.env.URI;
const jwt = require('jsonwebtoken')
const {
    mongooseToObject,
    mutipleMongooseToObject,
} = require("../../util/mongoose");

const client = new MongoClient(uri);

class SiteController {

    index(req, res) {
        if (req.cookies.accessToken) {
            return res.redirect('/admin/user')
        }
        res.render('homepage', {
            layout: 'login'
        })
    }

    getCreateUser(req, res) {
        if (!req.cookies.accessToken) {
            return res.redirect('/')
        }
        const decode = jwt.verify(req.cookies.accessToken, 'secretkey')
        User.findOne({_id: decode.id}, function(err, user) {
            if (user.type != 'admin') {
                return res.clearCookie('accessToken').redirect('/')
            } else return res.render("create/createUser");
        })
    }

    async postCreateUser(req, res) {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password, salt);

            const newUser = await new User({
                userid: req.body.userid,
                personName: req.body.personName,
                phone: req.body.phone,
                location: req.body.location,
                username: req.body.username,
                password: hashed,
            });

            const user = await newUser.save();
            res.redirect("/admin/user");
        } catch (err) {
            console.log(err);
        }
    }

    getCreateBook(req, res) {
        if (!req.cookies.accessToken) {
            return res.redirect('/')
        }
        const decode = jwt.verify(req.cookies.accessToken, 'secretkey')
        User.findOne({_id: decode.id}, function(err, user) {
            if (user.type != 'admin') {
                return res.clearCookie('accessToken').redirect('/')
            } else return res.render("create/createBook");
        })
        
    }

    postCreateBook(req, res) {
        let newBook = new Book({
            bookid: req.body.bookid,
            bookName: req.body.bookName,
            bookCategory: req.body.bookCategory,
            author: req.body.author,
            publicationDate: req.body.publicationDate,
            amount: req.body.amount,
        });
        if (req.file) {
            newBook.bookThumbnail = "/img/" + req.file.filename;
        }
        newBook
            .save()
            .then(() => {
                res.redirect("/admin/book");
            })
            .catch((err) => {
                console.error(err);
            });
    }

    async getCreateCallCard(req, res) {
        if (!req.cookies.accessToken) {
            return res.redirect('/')
        }
        const decode = jwt.verify(req.cookies.accessToken, 'secretkey')
        User.findOne({_id: decode.id}, function(err, user) {
            if (user.type != 'admin') {
                return res.clearCookie('accessToken').redirect('/')
            }
        })
        try {
            let users = await User.aggregate([
                { $project: { _id: 0, userid: 1 } },
            ]);
            let res1 = users.map(Object.values);
            JSON.stringify(res1);
            let arr1d = [].concat(...res1);
            res.render("create/createCallCard", {
                arruser: arr1d,
            });
        } catch (err) {
            console.log(err);
        }
    }

    postCreateCallCard(req, res) {
        let newCallCard = new CallCard({
            userid: req.body.userid,
            idCard: req.body.idCard,
            borrowDate: req.body.borrowedDate,
            returnDate: req.body.returnDate,
            fine: req.body.fine,
            note: req.body.note,
        })
        newCallCard.save().then(()=>{
            res.redirect("/admin/callcard")
        }).catch(err => {console.log(err)});
    }

    getUpdateUser(req, res) {

        if (!req.cookies.accessToken) {
            return res.redirect('/')
        }
        const decode = jwt.verify(req.cookies.accessToken, 'secretkey')
        User.findOne({_id: decode.id}, function(err, user) {
            if (user.type != 'admin') {
                return res.clearCookie('accessToken').redirect('/')
            }
        })

        let userID = req.params.userid
        User.findOne({userid: userID})
        .then((user) => {
            res.render('update/user', {
                user: mongooseToObject(user)
            })
        }).catch((err) => {console.log(err)});
    }

    postUpdateUser (req, res) {
        let {userid, personName, phone, location, username} = req.body
        User.findOneAndUpdate({userid: userid}, {personName: personName, phone: phone, location: location, username: username})
        .then(() => {
            res.redirect('/admin/user')
        }).catch(err => {
            res.send(err.message)
        })
    }

    getUpdateBook (req, res) {
        if (!req.cookies.accessToken) {
            return res.redirect('/')
        }
        const decode = jwt.verify(req.cookies.accessToken, 'secretkey')
        User.findOne({_id: decode.id}, function(err, user) {
            if (user.type != 'admin') {
                return res.clearCookie('accessToken').redirect('/')
            }
        })

        let bookid = req.params.bookid
        Book.findOne({bookid: bookid}).then(book => {
            res.render('update/book', {
                book: mongooseToObject(book)
            })
        }).catch(err => {   
            res.send(err.message)
        })
    }

    postUpdateBook (req, res) {
        let bookid = req.body.bookid,
            bookName = req.body.bookName,
            bookCategory = req.body.bookCategory,
            author = req.body.author,
            publicationDate = req.body.publicationDate,
            amount = req.body.amount,
            bookThumbnail
        if(req.file) {
            bookThumbnail = "/img/" + req.file.filename
        }
        if (req.file){
            Book.findOneAndUpdate({bookid: bookid}, {bookName: bookName, bookCategory: bookCategory, author: author, publicationDate: publicationDate, amount: amount, bookThumbnail: bookThumbnail})
            .then(() => {
                res.redirect('/admin/book')
            }).catch(err => {
                res.send(err.message)
            });
        } else {
            Book.findOneAndUpdate({bookid: bookid}, {bookName: bookName, bookCategory: bookCategory, author: author, publicationDate: publicationDate, amount: amount})
            .then(() => {
                res.redirect('/admin/book')
            }).catch(err => {
                res.send(err.message)
            });
        }
    }
}

module.exports = new SiteController();
