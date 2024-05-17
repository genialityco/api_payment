import mongoose from "mongoose";

const qrCodeSchema = new mongoose.Schema({
  paymentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Payment",
    required: true,
  },
  token: { type: String, required: true, unique: true },
  eventEntryUsed: { type: Boolean, default: false },
  foodRedemptionUsed: { type: Boolean, default: false },
});

const QRCode = mongoose.model("QRCode", qrCodeSchema);

module.exports = QRCode;
