const router = require("express").Router();
//const siteController = require("../app/controllers/siteController");
const SiteController = require("../app/controllers/siteController");
const upload = require("../util/upload");

router.get("/user", SiteController.getCreateUser);
router.post("/new-user", SiteController.postCreateUser);
router.get("/book", SiteController.getCreateBook);
router.post(
    "/new-book",
    upload.single("bookThumbnail"),
    SiteController.postCreateBook
);
router.get("/callcard", SiteController.getCreateCallCard);
router.post("/new-callcard", SiteController.postCreateCallCard);

module.exports = router;
