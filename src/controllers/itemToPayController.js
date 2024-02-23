import ItemToPayService from "../services/itemToPay.service.js";
import sendResponse from "../utils/response.js";

async function createItemToPay(req, res) {
  try {
    const paymentData = req.body.data;
    const createdPayment = await ItemToPayService.createItemToPay(paymentData);
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

async function getItemToPayById(req, res) {
  try {
    const itemId = req.params.id;
    const item = await ItemToPayService.getItemToPayById(itemId);
    sendResponse(res, 200, item);
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, error);
  }
}

async function updateItemToPay(req, res) {
  try {
    const itemId = req.params.id;
    const itemData = req.body.data;
    const updatedItem = await ItemToPayService.updateItemToPay(
      itemId,
      itemData
    );
    sendResponse(res, 200, updatedItem);
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, error);
  }
}

async function deleteItemToPay(req, res) {
  try {
    const itemId = req.params.id;
    const deletedItem = await ItemToPayService.deleteItem(itemId);
    sendResponse(res, 200, deletedItem);
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, error);
  }
}

export { createItemToPay, getItemsToPay, getItemToPayById, updateItemToPay, deleteItemToPay };
