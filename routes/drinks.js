const express = require("express");
const router = express.Router();

const drinks_controller = require('../controllers/drinks_controller')

//get Getraenke homepage
router.get("/", drinks_controller.index);

router.get("/addOne", drinks_controller.addOneToInv);
router.post("/addOne", drinks_controller.addOneToInv);

router.get('/subtractOne', drinks_controller.subtractOneFromInv)
router.post('/subtractOne', drinks_controller.subtractOneFromInv)

router.get("/add", drinks_controller.drinks_add_get);

router.post("/add", drinks_controller.drinks_add_post);

router.get("/:id", drinks_controller.drink_detail);

router.post("/:id", drinks_controller.drink_delete);

router.get("/:id/update", drinks_controller.drink_update_get);

router.post("/:id/update", drinks_controller.drink_update_post);





module.exports = router;