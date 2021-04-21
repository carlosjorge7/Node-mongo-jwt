const { Router } = require('express');
const router = Router();

const jwt = require('jsonwebtoken');
const config = require('../config');

const veryfyToken = require('./verify.token'); // middleware

const User = require('../models/User');

router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    const user = new User({
        username: username,
        email: email,
        password: password
    });
    user.password = await user.encryptPassword(user.password); // el metodo en User.js de encriptar es asincrono
    console.log(user);
    await user.save();
    const token = jwt.sign({id: user._id}, config.secret, {
        expiresIn: 60 * 60 * 24 // 1 dia en segundos
    });
    res.json({auth: true, token: token});
});

router.get('/profile', veryfyToken, async (req, res) => {
    // Buscamos el usuaruio por el id y lo devolvemos
    const user = await User.findById(req.userId, { password: 0 });
    if(!user) {
        return res.status(401).json({message: 'User not found'});
    }
    res.json(user);
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({email: email});
    if(!user) {
        return res.status(404).send('Email not exists');
    }
    const validPassword = await user.validatePassword(password);
    if(!validPassword) {
        return res.status(401).json({auth: false, token: null});
    }
    const token = jwt.sign({id: user._id}, config.secret, {
        expiresIn: 60 * 60 * 24 // 1 dia en segundos
    });
    res.json({ auth: true, token: token});
});

module.exports = router;