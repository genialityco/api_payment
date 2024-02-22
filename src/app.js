import "./config/db.js";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import paymentsRoutes from "./routes/dlocalGo.js";
import paymentDbRoutes from "./routes/paymentDb.js";
import itemToPayRoutes from "./routes/itemToPay.js";
import couponRoutes from "./routes/coupon.js";
import userRoutes from "./routes/user.js";

const app = express();

app.use(cors({ origin: "*" }));

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use("/api/dlocalgo", paymentsRoutes);
app.use("/api/paymentdb", paymentDbRoutes);
app.use("/api/item", itemToPayRoutes);
app.use("/api/coupon", couponRoutes);
app.use("/api/user", userRoutes);

app.get("/", (req, res) => {
  res.send("API pasarela");
});

app.use((err, req, res, next) => {
  console.error(err.stack || err);

  const statusCode = err.statusCode || 500;
  let message = err.message;

  if (process.env.NODE_ENV === "production" && !err.statusCode) {
    message = "Ocurrió un error en el servidor";
  }

  res.status(statusCode).json({ result: "error", message: message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
