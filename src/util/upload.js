const path = require("path");
const multer = require("multer");

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "src\\public\\img\\");
    },
    filename: function (req, file, cb) {
        let ext = path.extname(file.originalname);
        cb(null, Date.now() + ext);
    },
});

let upload = multer({
    storage: storage,
    // fileFilter: function (req, file, cb) {
    //     if (file.mimetype == "image/png" || file.mimetype == "image/jpg") {
    //         cb(null, true);
    //     } else {
    //         console.log("Chi dang anh duoi dang jpg hoac png");
    //         cb(null, false);
    //     }
    // },
});

module.exports = upload;
