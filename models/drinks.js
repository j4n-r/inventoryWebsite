const mongoose = require("mongoose");
const { DateTime } = require("luxon");
const Schema = mongoose.Schema;

const DrinksSchema = new Schema({
	marke:{ type: String, required: true, maxLength: 100 },
	name:{ type: String, required: true, maxLength: 100 },
	alkoholisch: {type: Boolean},
	einkaufspreis:{type: Number},
	verkaufspreis:{type: Number},
	vorhandene_menge:{type: Number, optional: true},
	verkaufte_menge:{type: Number, optional: true},
	ablaufdatum:{ type: Date, optional: true},
});

DrinksSchema.virtual("ablaufdatumFormatted").get(function () {
    return this.ablaufdatum ? DateTime.fromJSDate(this.ablaufdatum).toFormat('dd. MMM yyyy') : '';
  });

// Compile model from schema
module.exports = mongoose.model("Drinks", DrinksSchema);


