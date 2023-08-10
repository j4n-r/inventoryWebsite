const express = require("express");
const router = express.Router();

const drinks_controller = require('../controllers/drinks_controller')

//get Getraenke homepage
router.get("/", drinks_controller.index);

router.get("/add", drinks_controller.drinks_add_get);

router.post("/add", drinks_controller.drinks_add_post);


module.exports = router;