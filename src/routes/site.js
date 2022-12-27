const router = require("express").Router();
const siteController = require("../app/controllers/siteController");
const adminController = require("../app/controllers/manageAdmin");
const authController = require("../app/controllers/authController");
const upload = require("../util/upload");

router.get("/delete/user/:userid", adminController.deleteUser);
router.get("/delete/book/:bookid", adminController.deleteBook);
router.get("/delete/callcard/:cardID", adminController.deleteCallCard);
router.get("/update/user/:userid", siteController.getUpdateUser)
router.post("/update-user", siteController.postUpdateUser)
router.get("/update/book/:bookid", siteController.getUpdateBook)
router.post("/update-book", upload.single("bookThumbnail"), siteController.postUpdateBook)
router.post("/login", authController.userLogin);
router.get("/logout", authController.userLogout);
router.get("/", siteController.index);

module.exports = router;
