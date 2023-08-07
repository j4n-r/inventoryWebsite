const express = require("express");
const router = express.Router();

const getraenke_controller = require('../controllers/getraenke_controller')

//get Getraenke homepage
router.get("/", getraenke_controller.index);




module.exports = router;