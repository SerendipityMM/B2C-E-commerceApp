const mongoose = require('mongoose');


// Category Schema
const categorySchema = new mongoose.Schema (
    {

    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
     }


   }, 
   {timestamps:true}
);




// export based on userschema
module.exports = mongoose.model("Category", categorySchema);