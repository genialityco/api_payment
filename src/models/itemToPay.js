import mongoose from "mongoose";

const itemToPaySchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  create_at: { type: Date, default: Date.now },
  update_at: { type: Date, default: Date.now },
});

const ItemToPay = mongoose.model("ItemToPay", itemToPaySchema);

module.exports = ItemToPay;
