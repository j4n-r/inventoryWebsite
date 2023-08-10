const Drinks = require("../models/drinks")
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.index = asyncHandler(async (req, res, next) => {
  const allDrinks = await Drinks.find()
  res.render('drinks_list', {
    title: "Getränke", 
    drinks: allDrinks,
  })
  console.log(allDrinks)
});

//add drinks
exports.drinks_add_get = (req, res, next) => {
  res.render("addDrinks_form", {title: "Add Drinks"});
};

exports.drinks_add_post = [
  // validate + sanitize
  body("marke").trim().escape(),
  body("name").trim().escape(),
  body("alkoholisch").trim().escape(),
  body("einkaufspreis").trim().escape(),
  body("verkaufspreis").trim().escape(),
  body("vorhandene_menge").trim().escape(),
  body("verkaufte_menge").trim().escape(),
  body("ablaufdatum").trim().escape(),

  //Extract the validation errors from a request.
 asyncHandler(async (req, res, next) => {

  const alkoholisch = req.body.alkoholisch === 'on'; // Konvertiere 'on' in true, sonst false

  const erros = validationResult(req);
// creatre new drink (kein plan ob Drink oder Drinks)
  const drink = new Drinks({
    marke: req.body.marke,
    name: req.body.name,
    alkoholisch: alkoholisch,
    einkaufspreis: req.body.einkaufspreis,
    verkaufspreis: req.body.verkaufspreis,
    vorhandene_menge: req.body.vorhandene_menge,
    verkaufte_menge: req.body.verkaufte_menge,
    ablaufdatum: req.body.ablaufdatum,

  });


  // Data from form is valid.
  // cchck if Drink already exists
  const drinkExists = await Drinks.findOne({name: req.body.name}).exec();
  if (drinkExists) {
       // drink exists, redirect to all drins page
    res.redirect('drinks')
  } else {
    await drink.save() ;
    console.log(drink)
    res.redirect('/drinks')
  }
}) 
]