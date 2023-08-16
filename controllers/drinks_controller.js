const Drinks = require("../models/drinks")
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

//render drinks List
exports.index = asyncHandler(async (req, res, next) => {
  const allDrinks = await Drinks.find()
  res.render('drinks_list', {
    title: "Getränke", 
    drinks: allDrinks,
  })
});

//display a drinks details
exports.drink_detail = asyncHandler(async (req, res, next) => {
  const drink_detail = await (
    Drinks.findById(req.params.id)
    .exec()
  );
  if (drink_detail === null) {
    // No results.
    const err = new Error("drink not found");
    err.status = 404;
    return next(err);
  }
  console.log(drink_detail)
  
  res.render("drink_detail", {
    title: "Getränke",
    drink: drink_detail, 
  })
})


//add drinks
exports.drinks_add_get = (req, res, next) => {
  res.render("addDrinks_form", {title: "Getränke"});
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
  body("img_url"),

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
    img_url: req.body.img_url,

  });
  // Data from form is valid.
  // cchck if Drink already exists
  const drinkExists = await Drinks.findOne({name: req.body.name}).exec();
  if (drinkExists) {
       // drink exists, redirect to all drins page
    res.redirect('../error')
  } else {
    await drink.save() ;
    res.redirect('/drinks')
  }
}) 
]


//delete drink

exports.drink_delete = asyncHandler(async (req, res, next) => {
  await Drinks.findByIdAndRemove(req.body.id);
  res.redirect("/drinks")
});


// update drink

exports.drink_update_get = asyncHandler(async(req, res, next)  => {
  res.render('drink_update', { title: 'Update' });
});

exports.drink_update_post = asyncHandler(async(req, res, next)  => {
  res.render('drink_update', { title: 'Update' });
});