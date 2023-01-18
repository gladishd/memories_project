const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// "requires" new libraries from mern-auth-server/index.js

const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
// import dotenv from "dotenv";
// import cookieParser from "cookie-parser";

dotenv.config();

// import postRoutes from './routes/posts.js';

//set up server

const app = express();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));

app.use(express.json());

app.use(cookieParser());

app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true,
}));

//remove the warning
mongoose.set('strictQuery', true)

// const CONNECTION_URL = 'mongodb+srv://aguo888:aguo888@cluster0.tvjwmrn.mongodb.net/?retryWrites=true&w=majority'

//connect to mongoDB
// mongoose.connect(CONNECTION_URL)
//     .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
//     .catch((error) => console.log(error.message));

mongoose.connect(process.env.MDB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, (err) => {
    if (err) return console.error(err);
    console.log("Connected to MongoDB");
});

// set up routes
app.use("/auth", require("./mern-auth-server/routers/userRouter"));
app.use("/politician", require("./mern-auth-server/routers/politicianRouter"));

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

// app.use('/posts', postRoutes);
