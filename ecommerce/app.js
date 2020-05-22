const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
//saving data in the coockie
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
require('dotenv').config();


const userRoutes = require('./routes/user');

// app const
const app = express();

// database
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true 
})
.then(() => console.log("Database Connected!"));

//middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());



//routes and prefix api
app.use("/api", userRoutes);


// defining the port
const port = process.env.PORT || 9090

app.listen(9090, () => {
    console.log('Server is running on port ' + 9090 );
});