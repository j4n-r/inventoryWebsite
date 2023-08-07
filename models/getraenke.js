const mongoose = require("mongoose");
const { DateTime } = require("luxon");
const Schema = mongoose.Schema;

const GetraenkeSchema = new Schema({
	marke:{ type: String, required: true, maxLength: 100 },
	name:{ type: String, required: true, maxLength: 100 },
	alkoholisch: {type: Boolean},
	einkaufspreis:{type: Number},
	verkaufspreis:{type: Number},
	vorhandene_menge:{type: Number, optional: true},
	verkaufte_menge:{type: Number, optional: true},
	ablaufdatum:{ type: Date, optional: true},
});

GetraenkeSchema.virtual("ablaufdatum_formatted").get(function () {
    return this.ablaufdatum_formatted ? DateTime.fromJSDate(this.ablaufdatum_formatted).toLocaleString(DateTime.DATE_MED) : '';
  });

// Compile model from schema
module.exports = mongoose.model("Getraenke", GetraenkeSchema);


