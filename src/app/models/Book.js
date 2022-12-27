const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
    {
        bookid: { type: String, required: true, unique: true },
        bookName: { type: String, required: true },
        bookCategory: { type: String, required: true },
        author: { type: String, required: true },
        publicationDate: { type: Date, required: true },
        amount: { type: Number, required: true },
        bookThumbnail: { type: String, required: true },
    },
    { collection: "books" }
);

module.exports = mongoose.model("book", bookSchema);
