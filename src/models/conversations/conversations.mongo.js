const mongoose = require('mongoose')

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
    isGroup: {
        type: Boolean,
        required: true,
        unique: false,
        trim: false,
        minlength: 0,
        default: false
    },
    lastMessage: {
        type: Object,
        required: false,
        unique: false,
        trim: true,
        minlength: 0,
        default: ''

    }
    
}, {
    timestamps: true
});

const Conversation = mongoose.model('Conversation', conversationSchema, 'conversations');

module.exports = Conversation;