const mongoose = require("mongoose");
var randomProducts = require("mongoose-simple-random");
const Schema = mongoose.Schema;

let productsSchema = new Schema(
  {
    title: { type: String },
    imgPath: { type: String },
    imgName: { type: String },
    description: { type: String },
    interestedUser: [{ type: Schema.Types.ObjectId, ref: "User" }],
    category: {
      type: String,
      enum: ["photography", "drawings", "textile", "wood", "decoration"],
    },
    creator: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

productsSchema.plugin(randomProducts);

const Product = mongoose.model("Product", productsSchema);

module.exports = Product;
