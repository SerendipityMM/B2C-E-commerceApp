const express = require('express');
const mongoose = require('mongoose');
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

//routes
app.get("/", (req, res) => {
    res.send("Hello from Node!");
});


// defining the port
const port = process.env.PORT || 8000

app.listen(port, () => {
    console.log('Server is running on port ' + port );
})