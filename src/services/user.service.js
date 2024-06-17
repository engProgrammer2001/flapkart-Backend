const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwtProvider = require("../config/jwtProvider.js");

// create user fucntion
// userData is object and i'll pass from the frontend.
const createUser = async (userData) => {
  try {
    let { firstName, lastName, email, password, role } = userData;
    // this is for the password check
    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      throw new Error("user Already exist with this email : ", email);
    }
    // this is for the password
    password = await bcrypt.hash(password, 10);

    const user = await User.create({ firstName, lastName, email, password, role });
    // console.log("created User is ", user);
    return user;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

// find user by Id function
const findUserById = async (userId) => {
  try {
    const user = await User.findById(userId);
    // .populate("address");
    if (!user) {
      throw new Error("user not found with id : ", user);
    }
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

// find user by email
const getUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("user not found with Email : ", email);
    }
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getUserProfileByToken = async (token) => {
  try {
    const userId = jwtProvider.getUserIdFromToken(token);

    const user = await findUserById(userId);

    if (!user) {
      throw new Error("user not found with id: ", userId);
    }
    return user;

  } catch (error) {
    throw new Error(error.message);
  }
};

const getAllUsers = async () => {
  try {
    const users = await User.find();
    return users;
    
  } catch (error) {
    console.log("getAllUsers error : ",error);
    throw new Error(error.message);
  }
};

module.exports = {
  createUser,
  findUserById,
  getUserByEmail,
  getUserProfileByToken,
  getAllUsers,
};
