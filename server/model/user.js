import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name :{
        type: String,
        required: true
    },
    username :{
        type: String,
        required: true,
        unique: true
    },
    password :{
        type: String,
        required: true
    },
    role: { 
        type: String, 
        enum: ['admin', 'user'],
        default: 'user' 
    }
});
 const user = mongoose.model('user' , userSchema); 
 export default user;