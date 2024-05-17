import mongoose from "mongoose";
//renombrar base de datos esta será la boleta como tal
const ticketSchema = new mongoose.Schema({
  paymentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Payment",
    required: true,
  },
  eventEntryUsed: { type: Boolean, default: false },
  foodRedemptionUsed: { type: Boolean, default: false },
});

const ticket = mongoose.model("ticket", ticketSchema);

module.exports = ticket;
