const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
       
    name : {
        type: String,
        required: [true, "Name is required"], // this text appear when error 
        trim: true, 
    },
    phone : {
      type: String,
      required: [true, "phone is required"], 
      trim: true, 
  },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,  
        lowercase: true,
        trim: true,
      },
      password: {
        type: String,
        required: [true, "Password is required"],
        minlength: 6,
      },
      role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
      },
      verificationCode: {
        type: String,
        required: false, 
      },
      isVerified: {
        type: Boolean,
        default: false, 
      },
      token:{
        type:String,
  
      }

},
{ timestamps: true }
)



const User = mongoose.model("User", UserSchema);

module.exports = User;