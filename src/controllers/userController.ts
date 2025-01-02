const userService = require('../services/userService');
const commonFunc = require('../utils/common');

// Controller to handle user creation
const createUser = async (req: any, res: any) => {
    try {
        // console.log(commonFunc);
        // return
        const { email, password, otp, status } = req.body;

        // Validate input data
        if (!email || !password) {
            return commonFunc.send(res, 400, {}, "Email and password are required.");
        }

        const userData = { email, password, otp, status };

        const createdUser = await userService.createUser(req, userData);

        // Send success response with user data
        commonFunc.default.send(res, 201, createdUser, "User created successfully.");
    } catch (error) {
        console.error(error);
        commonFunc.default.send(res, 500, {}, "Internal server error while creating user.");
    }
};

// Controller to handle user login
const loginUser = async (req: any, res: any) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return commonFunc.default.send(res, 400, {}, "Email and password are required.");
        }

        const { user, token } = await userService.loginUser(email, password);

        // Send success response with the user data and JWT token
        commonFunc.default.send(res, 200, { user, token }, "Login successful.");
    } catch (error) {
        console.error(error);
        commonFunc.default.send(res, 401, {}, "Invalid credentials.");
    }
};

// Export controller functions
module.exports = {
    createUser,
    loginUser,
};
