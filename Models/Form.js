const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const formSchema = new Schema(
  {
    items: [
      {
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        unit: { type: String, required: true },
        category: {
          type: String,
          enum: ["food", "household", "medical"],
          required: true,
        },
      },
    ],
    note: { type: String },
    type: { type: String, enum: ["give", "need"] },
    status: { type: String, enum: ["ongoing", "done"], default: "ongoing" },
    isDeleted: { type: Boolean, default: false },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);
const Form = mongoose.model("Form", formSchema);

module.exports = Form;
