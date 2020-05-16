const mongoose = require('mongoose');
const crypto = require('crypto');
const uuidv1 = require('uuidv1');




//Schema
const userSchema = new mongoose.Schema ({

    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },

    email: {
        type: String,
        trim: true,
        required: true,
        unique: 32
    },
    
    hashed_password: {
        type: String,
        required: true
    },
    
    about: {
        type: String,
        trim: true
    },
    salt: String,
    role: {
        type: Number,
        default:0
    },
    history: {
        type: Array,
        default: []
    }

}, {timestamps:true}
);


// virtual fields, set the password
userSchema.virtual('password')
//password coming from the client side
.set(function(password) {
     this._password = password
     // to hash the password function
     this.salt = uuidv1()
     this.hashed_password = this.encryptPassword(password)
})

.get(function() {
    return this._password
})

// encryptpassword function that takes password 
userSchema.methods = {
    encryptPassword:function(password){
        if(!password) return '';
        try {
            //hashing the password
            return crypto.createHmac('sha1', this.salt)
                         .update(password)
                         .digest('hex')
        } catch (err) {
            return '';
        }
    }
};
// export based on userschema
module.exports = mongoose.model("User", userSchema);