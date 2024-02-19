import User from "../models/user";

class UserService {
  async createUser(data) {
    try {
      const User = new User(data);
      const createdUser = await User.save();
      return createdUser;
    } catch (error) {
      throw error;
    }
  }
  async getUsers() {
    try {
      const Users = await User.find();
      return Users;
    } catch (error) {
      throw error;
    }
  }

  async updateUser(id, data) {
    try {
      const updatedUser = await User.findOneAndUpdate({ _id: id }, data, {
        new: true,
      });
      return updatedUser;
    } catch (error) {
      throw error;
    }
  }

  async getUserById(id) {
    try {
      const User = await User.findById(id);
      return User;
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(id) {
    try {
      const User = await User.findByIdAndDelete(id);
      return User;
    } catch (error) {
      throw error;
    }
  }
}

export default new UserService();
