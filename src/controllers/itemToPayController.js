import ItemToPayService from "../services/itemToPay.service.js";
import sendResponse from "../utils/response.js";

async function createItemToPay(req, res) {
  try {
    const paymentData = req.body.data;
    const createdPayment = await ItemToPayService.createItemToPay(
      paymentData
    );
    sendResponse(res, 200, createdPayment);
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, error);
  }
}

async function getItemsToPay(req, res) {
  try {
    const payment = await ItemToPayService.getItemsToPay();
    sendResponse(res, 200, payment);
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, error);
  }
}

export { createItemToPay, getItemsToPay };
