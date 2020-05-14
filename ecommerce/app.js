const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');
require('dotenv').config()



// app const
const app = express();

// database
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true 
})
.then(() => console.log("Database Connected!"));

//routes and prefix api
app.use("/api", userRoutes);


// defining the port
const port = process.env.PORT || 8000

app.listen(port, () => {
    console.log('Server is running on port ' + port );
})