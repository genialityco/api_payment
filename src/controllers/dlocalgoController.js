import sendResponse from "../utils/response.js";
import PaymentDbService from "../services/paymentDb.service";
import CouponService from "../services/coupon.service";
import { generatePaymentEmailTemplate } from "../services/emailTemplate.service.js";
import { sendEmail } from "../services/email.service.js";
import { sendMessageSuccessPayment } from "../services/whatsapp.service.js";
import { createTicket } from "../services/ticket.service.js";
import paymentDbService from "../services/paymentDb.service";

const axios = require("axios");
const generateQRCode = require("../utils/generateQRCode.js");

const {
  DLOCALGO_KEY,
  DLOCALGO_KEY_SECRET,
  DLOCALGO_ENDPOINT,
  NOTIFICATION_URL_API,
} = process.env;

async function createPayment(req, res) {
  try {
    const {
      amount,
      currency,
      country,
      payer,
      description,
      success_url,
      back_url,
    } = req.body.data;
    const paymentData = {
      amount,
      currency,
      country,
      payer,
      description,
      success_url,
      back_url,
      notification_url: `${NOTIFICATION_URL_API}`,
    };

    const response = await axios.post(DLOCALGO_ENDPOINT, paymentData, {
      headers: {
        Authorization: `Bearer ${DLOCALGO_KEY}:${DLOCALGO_KEY_SECRET}`,
        "Content-Type": "application/json",
      },
    });

    res.status(200).send(response.data);
  } catch (error) {
    console.log(error);
    sendResponse(res, 500, error);
  }
}

async function getPayment(req, res) {
  try {
    const paymentId = req.params.id;
    const response = await axios.get(`${DLOCALGO_ENDPOINT}/${paymentId}`, {
      headers: {
        Authorization: `Bearer ${DLOCALGO_KEY}:${DLOCALGO_KEY_SECRET}`,
        "Content-Type": "application/json",
      },
    });

    res.status(200).send(response.data);
  } catch (error) {
    console.error("Error al obtener el pago:", error);
    sendResponse(res, 500, "Error al obtener el pago.");
  }
}

async function paymentNotifications(req, res) {
  try {
    const { payment_id } = req.body;

    const response = await axios.get(`${DLOCALGO_ENDPOINT}/${payment_id}`, {
      headers: {
        Authorization: `Bearer ${DLOCALGO_KEY}:${DLOCALGO_KEY_SECRET}`,
        "Content-Type": "application/json",
      },
    });

    const paymentUpdate = {
      status: response.data.status,
      redirect_url: response.data.redirect_url,
      approved_date: response.data.approved_date,
    };

    const paymentData = await PaymentDbService.updatePayment(
      payment_id,
      paymentUpdate
    );

    if (paymentData.status === "PAID" && paymentData.coupon !== null) {
      const coupon = await CouponService.getCouponById(paymentData.coupon);
      const updatedCoupon = {
        used: coupon.used + 1,
      };
      await CouponService.updateCoupon(coupon._id, updatedCoupon);
    }

    // Intento enviar el correo
    if (paymentData.status === "PAID") {
      const ticketCreated = await createTicket({
        paymentId: paymentData._id,
      });

      // guardar el ID de la boleta actualmente modelo QRCode añadir, nombre y telefono, fecha de generación de la boleta, referencia del pago dlocalgo
      const qrData = {
        _id: ticketCreated._id,
        name: paymentData.payer.name,
        phone: paymentData.payer.phone,
        generationDate: new Date().toISOString(),
        order_id: paymentData.order_id,
      };

      const qrCodeImage = await generateQRCode(
        qrData,
        `QR-${paymentData.payment_id}`
      );

      const htmlBody = generatePaymentEmailTemplate(paymentData, qrCodeImage);

      await paymentDbService.updatePayment(paymentData.payment_id, {
        ticketGenerated: htmlBody,
      });

      try {
        await sendEmail({
          to: paymentData.payer.email,
          subject: "Entrada para el evento QUE DÍA TAN PADRE - Criadero YUSAPI",
          htmlBody,
        });

        console.log(`Correo enviado exitosamente a ${paymentData.payer.email}`);
      } catch (emailError) {
        console.error(
          `Error al enviar correo a ${paymentData.payer.email}:`,
          emailError
        );
      }
    }

    res.status(200).send("Notification received and email sent");
  } catch (error) {
    console.error("Se ha presentado un error:", error);
    res.status(500).send("Error al obtener el pago.");
  }
}

export { createPayment, getPayment, paymentNotifications };

// Intento enviar el mensaje a WhatsApp
// try {
//   const prefixFormated = paymentData.payer.prefix.replace(/\+/g, "");
//   const recipientId = prefixFormated + paymentData.payer.phone;
//   const templateName = "pago_exitoso_membresia";
//   const parameters = [
//     paymentData.payer.name,
//     paymentData.description,
//     paymentData.order_id,
//   ];

//   await sendMessageSuccessPayment(recipientId, templateName, parameters);
//   console.log(`Mensaje de WhatsApp enviado exitosamente a ${recipientId}`);
// } catch (whatsappError) {
//   console.error(`Error al enviar mensaje de WhatsApp a ${recipientId}:`, whatsappError);
// }
