import User from '../models/user'; // Assuming your User model is here
import jwt from 'jsonwebtoken';
const bcrypt = require("bcrypt");

// Define types for the input data
interface CreateUserData {
    email: string;
    password: string;
    otp?: string;
    status?: string;
}

interface LoginUserData {
    email: string;
    password: string;
}

interface UserWithToken {
    user: any; // Replace with your User type
    token: string;
}

// Create a new user
const createUser = async (req: any, userData: CreateUserData): Promise<any> => {
    try {
        // Ensure to hash the password before saving (you can use bcrypt for this)
        const hashedPassword = await bcrypt.hash(userData.password, 10);

        const newUser = new User({
            email: userData.email,
            password: hashedPassword, // Ensure you hash the password before saving
            otp: userData.otp || "",
            status: userData.status || "active",
        });

        await newUser.save();
        return newUser;
    } catch (error) {
        throw error;
    }
};

// Login user
const loginUser = async (email: string, password: string): Promise<UserWithToken> => {
    try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error("User not found");
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            throw new Error("Invalid credentials");
        }


        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET || "your-secret-key", // Use an environment variable for the secret key
            { expiresIn: "1h" } // Token expires in 1 hour
        );

        return { user, token };
    } catch (error) {
        throw error;
    }
};

// Export functions using module.exports
module.exports = {
    createUser,
    loginUser,
};
