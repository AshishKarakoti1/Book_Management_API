const express = require('express');
const Router = express.Router();
const {handleSignUp , handleLogin} = require('../Controllers/auth');

Router.route('/signup')
    .post(handleSignUp);
Router.route('/login')
    .post(handleLogin);

module.exports = Router;