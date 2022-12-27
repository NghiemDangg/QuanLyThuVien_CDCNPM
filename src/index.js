const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const PORT = process.env.PORT || 8080;
const uri = process.env.URI;
const route = require("./routes");
const path = require("path");
const { engine } = require("express-handlebars");
const cookieParser = require("cookie-parser");

app.use(cookieParser())

//view engine
app.engine(
    "hbs",
    engine({
        extname: ".hbs",
    })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "/views"));

//connect db
mongoose.set("strictQuery", true);

mongoose.connect(uri, { useNewUrlParser: true });
mongoose.connection
    .once("open", () => {
        console.log("Connect thanh cong");
    })
    .on("error", (error) => {
        console.log("Your Error: ", error);
    });

//static files
app.use(express.static(path.join(__dirname, "/public/")));

app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use(express.json());

//route
route(app);

//display
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});
