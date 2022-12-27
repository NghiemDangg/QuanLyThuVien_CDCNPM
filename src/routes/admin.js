const router = require("express").Router();
const adminController = require("../app/controllers/manageAdmin");

router.get("/user", adminController.userManager);
router.get("/book", adminController.bookManager);
router.get("/callcard", adminController.callCardManager)

module.exports = router;
