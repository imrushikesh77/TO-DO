const User = require("../models/user");
const Task = require("../models/tasks");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

const getLogin = (req, res) => {
  res.render("login");
};

const postLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const currUser = await User.findOne({ username });
    if (currUser) {
      const isValid = await bcrypt.compare(password, currUser.password);
      if (isValid) {
        const token = jwt.sign({ userId: currUser._id, username: currUser.username }, secret);
        return res.status(200).cookie("token",token).redirect("/user/dashboard");
      } else {
        res.render("login", { message: "Invalid Credentials" });
      }
    } else {
        res.render("login", { message: "User does not exist" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const getRegister = (req, res) => {
  res.render("register");
};

const postRegister = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).render("register", { message: "All fields are required" });
    }
    if(!email.includes("@")){
        return res.status(400).render("register", { message: "Invalid email address" });
    }
    if(password.length < 8){
        return res.status(400).render("register", { message: "Password must be at least 6 characters long" });
    }
    if (username.length < 3) {
      return res.render("register", { message: "Username must be at least 3 characters long" });
    }
    const currUser = await User.findOne({ username });
    if (currUser) {
      return res.status(400).render("register", { message: "User already exists" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashPassword,
    });
    const token = jwt.sign({ userId: user._id, username: user.username }, secret);
    return res.status(200).cookie("token",token).redirect("/user/dashboard");
  } catch (error) {
    if (error.code === 11000) {
        // MongoDB duplicate key error (code 11000)
        return res.status(400).render("register", { message: "User already exists" });
      } else {
        // Handle other errors gracefully
        console.error(error);
        return res.status(500).render("error", { message: "Internal Server Error" });
    }
  }
};

const postLogout = (req, res) => {
  return res.clearCookie("token").redirect("/user/login");
};

const getDashboard = async (req, res) => {
  const username = req.username;
  // console.log(req.userId);
  // console.log(username);
  const tasks = await Task.find({ createdBy: req.userId });
  // // console.log(tasks);
  res.render("dashboard", { tasks:tasks, username: username });
};

module.exports = {
  getLogin,
  postLogin,
  getRegister,
  postRegister,
  postLogout,
  getDashboard,
};
