const User = require('../models/User');
const jwt = require('jsonwebtoken');

const errorHandler = (err) => {
    console.log(err.message, err.code);
    let errors = { name:'', username: '', emailId: '', password: '' };

    if (err.code === 11000) {
        errors.emailId = 'Email is already registered';
        return errors;
    }
    
    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
          errors[properties.path] = properties.message;
        });
    }

    return errors;
}

const maxAge = 60 * 60 * 24 * 3;
const createJwtToken = (id) => {
    return jwt.sign({id}, 'SG overflow secret', {
        expiresIn: maxAge
    });
}

module.exports.signup_get = async (req, res) => {
    res.render('signup');
}

module.exports.login_get = async (req, res) => {
    res.render('login');
}

module.exports.signup_post = async (req, res) => {
    const {name, username, password, emailId} = req.body;
    
    try {
        //console.log({name, username, password, emailId});
        const user = await User.create({name, username, password, emailId});
        const token = createJwtToken(user._id);
        res.cookie('jwt', token, {
            httpOnly: true,
            maxAge: maxAge * 1000
        });
        res.status(201).json({user: user._id});
    } catch (error) {
        const errors = errorHandler(error);
        res.status(400).json({errors});
    }
}

module.exports.login_post = async (req, res) => {
    const {emailId, password} = req.body;
    try {
        const user = await User.login(emailId, password);
        const token = createJwtToken(user._id);
        res.cookie('jwt', token, {
            httpOnly: true,
            maxAge: maxAge * 1000
        });
        res.status(201).json({user: user._id});
    }
    catch (error) {
        console.log(error);
        res.status(400).json({error});
    }
}

module.exports.logout_get = async (req, res) => {
    res.cookie('jwt','', {maxAge: 1});
    res.redirect('/');
}