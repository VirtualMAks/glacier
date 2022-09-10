const express = require('express');
const app =express();

// const app = require("./app");
const dotenv = require("dotenv");
const cors = require('cors');
const connection = require("./db");
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');



connection();
//middleware
app.use(express.json());
app.use(cors());


//routes
app.use("/api/v1/users",userRoutes);
app.use("/api/v1/auth",authRoutes);
app.use("api/v1/import",userRoutes);


 dotenv.config({path:"backend/.env"});

const port = process.env.PORT || 8080;
app.listen(port,console.log(`listening on ${port}`));
