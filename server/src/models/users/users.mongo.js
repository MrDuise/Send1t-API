import mongoose from "mongoose";

//temp user schema. will be modified later
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    lastName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    userName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    password: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 8,
        maxLength: 20
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    conversationLog: {
        type: Array,
        required: false,
        unique: false,
        trim: false,
        minlength: 0,
        default: []
    },
    contacts: {
        type: Array,
        required: true,
        default: []
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

export default User;
