import mongoose from "mongoose";

const itemToPaySchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  currency: {type: String, required: true},
  active: { type: Boolean, default: true },
  create_at: { type: Date, default: Date.now },
  update_at: { type: Date, default: Date.now },
});

const ItemToPay = mongoose.model("ItemToPay", itemToPaySchema);

module.exports = ItemToPay;
