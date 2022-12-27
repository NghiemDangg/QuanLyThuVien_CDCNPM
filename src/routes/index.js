const adminRouter = require("./admin");
const siteRouter = require("./site");
const createRouter = require("./create");

function route(app) {
    app.use("/create", createRouter);
    app.use("/admin", adminRouter);
    app.use("/", siteRouter);
}

module.exports = route;
