const mogoose = require("mongoose");
const Schema = mogoose.Schema;

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
