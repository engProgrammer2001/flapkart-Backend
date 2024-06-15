const jwt = require("jsonwebtoken");
require("dotenv").config();


const SECRET_KEY = process.env.SECRET_KEY;

const generateToken = (userId) => {
  const token = jwt.sign({ userId: userId }, SECRET_KEY, { expiresIn: "198h" });
  return token;
};

const getUserIdFromToken = (token) => {
  const decodedToken = jwt.verify(token, SECRET_KEY);
  return decodedToken.userId;
};

module.exports = { generateToken, getUserIdFromToken };
