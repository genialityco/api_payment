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

  async getItemToPayById(id) {
    try {
      const item = await ItemToPay.findOne({ _id: id });
      return item;
    } catch (error) {
      throw error;
    }
  }

  async updateItemToPay(id, data) {
    try {
      const updatedItem = await ItemToPay.findOneAndUpdate({ _id: id }, data, {
        new: true,
      });
      return updatedItem;
    } catch (error) {
      throw error;
    }
  }

  async deleteItem(id) {
    try {
      const item = await ItemToPay.findByIdAndDelete(id);
      return item;
    } catch (error) {
      throw error;
    }
  }
}

export default new ItemToPayService();
