import UserService from "../services/user.service";
import sendResponse from "../utils/response";

const admin = require('firebase-admin');

async function createUser(req, res) {
  try {
    const UserData = req.body.data;
    const createdUser = await UserService.createUser(UserData);

    admin.auth().setCustomUserClaims(UserData.uid, { role: 'admin' }).then(() => {
        // El claim se ha establecido correctamente
      });

    sendResponse(res, 200, createdUser);
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, error);
  }
}

async function getUsers(req, res) {
  try {
    const Users = await UserService.getUsers();
    sendResponse(res, 200, Users);
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, error);
  }
}

async function getUserById(req, res) {
  try {
    const UserId = req.params.id;
    const User = await UserService.getUserById(UserId);
    sendResponse(res, 200, User);
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, error);
  }
}

async function updateUser(req, res) {
  try {
    const UserId = req.params.id;
    const UserData = req.body.data;
    const updatedUser = await UserService.updateUser(
      UserId,
      UserData
    );
    sendResponse(res, 200, updatedUser);
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, error);
  }
}

async function deleteUser(req, res) {
  try {
    const UserId = req.params.id;
    const deletedUser = await UserService.deleteUser(UserId);
    sendResponse(res, 200, deletedUser);
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, error);
  }
}

export { createUser, getUsers, getUserById, updateUser, deleteUser };
