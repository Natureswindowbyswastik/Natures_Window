const router = require('express').Router();
const {login,signup} = require('../controller/AuthController')
const { loginvalidation,signupvalidation} = require ('../Middleware/Validation');

router.post('/login',loginvalidation,login)
router.post('/signup',signupvalidation,signup);

module.exports= router;