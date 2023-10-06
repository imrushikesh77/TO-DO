const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const PORT = process.env.PORT;
const taskRoutes = require('./backend/routes/tasks');
const userRoutes = require('./backend/routes/user');
const { connectToMongoDB } = require('./backend/connectDB');
const cookieParser = require('cookie-parser');
const {redirectToDashboardIfAuthenticated} = require("./backend/middlewares/auth");

//Connect to MongoDB
const MONGO_URL = process.env.MONGO_URL;
connectToMongoDB(MONGO_URL)
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((err) => {
    console.log('Error connecting to DB', err);
}   
);

//Set view engine
app.set('view engine', 'ejs');
app.set('views', './frontend/views');

app.use('/assets', express.static('./frontend/assets'));
app.use(express.urlencoded({ extended: false}));
app.use(express.json());
app.use(cookieParser());

app.use('/user', userRoutes);
app.use('/tasks', taskRoutes);
app.get('/',redirectToDashboardIfAuthenticated, (req,res)=>{
    res.render("home");
})

app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
});