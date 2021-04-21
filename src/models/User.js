const { Schema, model} = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    username: String,
    email: String,
    password: String
});

userSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10); // num veces q aplica el algoritmo
    return bcrypt.hash(password, salt)
}

userSchema.methods.validatePassword = function (password) {
    return bcrypt.compare(password, this.password); // imganino que bycrypt desencripta al comparar
}

// https://www.faztweb.com/curso/nodejs-jwt-simple

module.exports = model('User', userSchema);