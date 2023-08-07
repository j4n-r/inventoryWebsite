const Getraenke = require("../models/getraenke")
const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async (req, res, next) => {
  const allGetraenke = await Getraenke.find({},'marke name').exec()
  res.render('getraenke_list', {
    title: "Getränke", 
    getraenke: allGetraenke,
  })
  console.log(allGetraenke)
});

