import ItemToPay from "../models/itemToPay";

class ItemToPayService {
  async createItemToPay(data) {
    try {
      const item = new ItemToPay(data);
      const createdItem= await item.save();
      return createdItem;
    } catch (error) {
      throw error;
    }
  }

  async getItemsToPay() {
    try {
      const items = await ItemToPay.find();
      return items;
    } catch (error) {
      throw error;
    }
  }
}

export default new ItemToPayService();
