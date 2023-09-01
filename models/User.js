const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name :{
        type: String,
        required: [true, 'Please enter your name']
    },
    username : {
        type : String,
        required: [true, 'Please enter your username'],
        lowercase: true
    },
    password : {
        type: String,
        required: [true, 'Please enter your password'],
        minLength: [6, 'Minimum length of the password should be 8 characters']
    },
    emailId : {
        type: String,
        required: [true, 'Please enter your email'],
        unique: true,
        lowercase: true
    },
    role : {
        type: String,
        default: "user",
        enum: ["user", "admin"]
    }
},
{
    timestamps: true
});

//hashing the password before saving in db
userSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.statics.login = async function(emailId, password)
{
    const user = await this.findOne({emailId});
    if(user){
        const auth = await bcrypt.compare(password, user.password);
        if(auth){
            return user;
        }
        throw Error('Incorrect password');
    }
    throw Error('User not found');
}

const User = mongoose.model('User', userSchema);
module.exports = User;