const mogoose = require("mongoose");
const Schema = mogoose.Schema;
const itemSchema = new Schema(
  {
    item: [
      {
        quantity: { type: Number, required: true },
        unit: { type: String, required: true },
        catagories: {
          type: Schema.Types.ObjectId,
          ref: "Catagory",
        },
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
