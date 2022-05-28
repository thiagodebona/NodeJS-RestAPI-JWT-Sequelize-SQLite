const router = require('express').Router();
const { login, register } = require("../repositories/usersRepository")

router.post('/register', register)

router.post('/login', login)

module.exports = router;