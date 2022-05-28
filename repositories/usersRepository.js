const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models').Users;
const resultService = require('../utils/defaultResultService');
const { pushNewAuditChange } = require('../repositories/auditRepository');
const { registerValidator, loginValidator } = require('../validations/authValidation');

const registerUser = async (req, res) => {
    //Run body parameters through the validation schema before continuing:
    const { error } = registerValidator(req.body);
    if (error)
        return resultService.createErrorResult(res, null, error.details[0].message, error);

    const usernameExists = await User.findOne({ where: { "username": req.body.username } });
    if (usernameExists)
        return resultService.createErrorResult(res, null, "A User account with this username already exists");

    const emailExists = await User.findOne({ where: { "email": req.body.email } });
    if (emailExists)
        return resultService.createErrorResult(res, null, "A User account with this email already exists");

    //Hash the password with bcrypt and a generated salt.
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //Build the user object to write to database
    const newUser = {
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date()
    }

    //Save the new user object, using the User model we defined in Sequelize. Return the new user ID in JSON
    await User.create(newUser).then(item => {
        pushNewAuditChange("User", "Insert", item.id, 0, function (result) {
            resultService.createSuccessResult(res, item, "User successfully registered");
        });
    }).catch(err => resultService.createErrorResult(res, null, err.message, error, 500));
}

const doLogin = async (req, res) => {
    //Run body parameters through the validation schema
    const { error } = loginValidator(req.body);
    if (error)
        return resultService.createErrorResult(res, null, error.details[0].message, error, 400);

    //Check if the email address exists in database. If not, reject the login
    const user = await User.findOne({ where: { "email": req.body.email } });
    if (!user)
        return resultService.createErrorResult(res, null, "Email is not correct", error, 400);

    //Check if pasword is correct using bcrpyt to compare to the stored hash. If they don't match, reject the login
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword)
        return resultService.createErrorResult(res, null, "Invalid password", error, 400);

    //Create + Assign a JWT token with a 10 minute expiry
    const token = jwt.sign({
        id: user.id,
        exp: Math.floor(Date.now() / 1000) + (60 * 10)
    }, process.env.TOKEN_SECRET);

    //Return the token in a header called 'auth-token'. Add auth-token to any future requests to protected routes
    res.header("auth-token", token);

    resultService.createSuccessResult(res, { token: token }, "Successfully authenticated");
}

module.exports = {
    login: doLogin,
    register: registerUser
};