import mongoose from "mongoose";

//temp user schema. will be modified later
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
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
