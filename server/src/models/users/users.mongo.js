const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');

//temp user schema. will be modified later
const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 6,
        maxLength: 15
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 8,
        maxLength: 100
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
    },
    blockedUsers: {
        type: Array,
        required: true,
        default: []
    }
}, {
    timestamps: true
});

//auto hash password before saving
//this is done before the user is saved to the database
//and when the user is updated
userSchema.pre("save", function (next) {
    const user = this
  
    if (this.isModified("password") || this.isNew) {
      bcrypt.genSalt(10, function (saltError, salt) {
        if (saltError) {
          return next(saltError)
        } else {
          bcrypt.hash(user.password, salt, function(hashError, hash) {
            if (hashError) {
              return next(hashError)
            }
  
            user.password = hash
            next()
          })
        }
      })
    } else {
      return next()
    }
  })

const User = mongoose.model('user', userSchema, 'Users');

module.exports = User;
