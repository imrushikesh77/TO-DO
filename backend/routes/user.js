const express = require('express');
const router = express.Router();

const {
    getLogin,
    postLogin,
    getRegister,
    postRegister,
    postLogout,
    getDashboard
} = require('../controllers/user');

const {
    verifyToken, 
    redirectToDashboardIfAuthenticated
} = require("../middlewares/auth");

router
    .get('/login',redirectToDashboardIfAuthenticated, getLogin)
    .post('/login',postLogin);

router
    .get('/register',redirectToDashboardIfAuthenticated, getRegister)
    .post('/register', postRegister);

router.post("/logout", postLogout);

router.get("/dashboard",verifyToken,  getDashboard);

module.exports = router;