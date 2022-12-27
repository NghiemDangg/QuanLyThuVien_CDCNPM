const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        userid: { type: String, required: true, unique: true },
        personName: { type: String, required: true },
        phone: { type: String, required: true, unique: true },
        location: { type: String },
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        type: { type: String, required: true, default: "user" },
    },
    { collection: "users" }
);

const User = mongoose.model("user", userSchema);

module.exports = User;
