const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const catagorySchema = new Schema({
  group: {
    type: String,
    enum: ["clothes", "food", "protectedClothes"],
    required: true,
  },
  name: { type: String, required: true },
  unit: { type: String, required: true },
});
const Catagory = mongoose.model("Catagory", catagorySchema);

module.exports = Catagory;
