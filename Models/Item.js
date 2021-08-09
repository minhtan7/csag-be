const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const itemSchema = new Schema(
  {
    item: [
      {
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        unit: { type: String, required: true },
        catagories: { type: String, required: true },
      },
    ],
    status: { type: String, enum: ["give", "need"] },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);
const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
