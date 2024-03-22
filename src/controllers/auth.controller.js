const user = require("../models/user.model");
const bcrypt = require("bcrypt");
const APIError = require("../utils/errors");
const Response = require("../utils/response");
const moment = require("moment");
const jwt = require('jsonwebtoken');

const secretKey = 'abc123';


const adminLogin = async (req, res) => {
  const { email } = req.body;
  let userInfo = await user.findOne({ email });
  if (!userInfo) throw new APIError("User not found!", 401);
  if(userInfo.role === 'admin'){
    const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '24h' });
    userInfo = {...userInfo,token}
    return new Response(userInfo, "User Created Successfully").success(res);
 }else{
     return new Response("User Unauthorized").error401(res);
 }
};



const login = async (req, res) => {
  const { email, password } = req.body;
  let userInfo = await user.findOne({ email });
  if (!userInfo) throw new APIError("User not found!", 401);
  const comparePassword = await bcrypt.compare(password, userInfo.password);
  if (!comparePassword) throw new APIError("Incorrect Password", 401);
  const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '24h' });
  userInfo = {...userInfo,token}
  // res.send(201).json(userInfo)
  return new Response(userInfo, "User Created Successfully").success(res);
};

const register = async (req, res) => {
  const { email } = req.body;

  const userCheck = await user.findOne({ email });

  if (userCheck) {
    return new Response("User Already Exist").error401(res);
  }

  req.body.password = await bcrypt.hash(req.body.password, 10);

  console.log("hash password : ", req.body.password);

  const userSave = new user(req.body);

  await userSave
    .save()
    .then((data) => {
      return new Response(data, "User Created Successfully").created(res);
    })
    .catch((err) => {
      throw new APIError("Error In Creating User!", 400);
    });
};

module.exports = {
  login,
  register,
  adminLogin
};
