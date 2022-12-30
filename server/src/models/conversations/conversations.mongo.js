import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
    admin: {
        type: String,
        required: true,
        unique: false,
        trim: true,
        minlength: 3
    },
    createdAt: {
        type: Date,
        required: true,
        unique: false,
        trim: false,
        minlength: 0,
        default: Date.now
    },
    participants: {
        type: Array,
        required: true,
        unique: false,
        trim: false,
        minlength: 2,
        
    },
    messages: {
        type: Array,
        required: true,
        unique: false,
        trim: false,
        minlength: 0,
        default: []
    },
    isGroup: {
        type: Boolean,
        required: true,
        unique: false,
        trim: false,
        minlength: 0,
        default: false
    },
    dateUpdated: {
        type: Date,
        required: false,
        unique: false,
        trim: false,
        minlength: 0,
        default: Date.now
    }
}, {
    timestamps: true
});

const Conversation = mongoose.model('Conversation', conversationSchema);

module.exports = Conversation;