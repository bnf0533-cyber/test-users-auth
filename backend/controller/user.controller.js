import { getAllUsers, getUserById, login, registerUser } from "../DAL/dal.js";
import { createToken } from "../utils/generateToken.js";

export async function registerUserController(req, res) {
    try {
        const user = await registerUser(req.body);
        if (!user) {
            return res.status(400).json("email already exists");
        }
        const token = createToken({ id: user._id, email: user.email });
        res.status(201).json({ message: "user created successfully", user, token });
    } catch (error) {
        console.error(error.message);
        res.status(400).json("user cant saved");
    }
}

export async function loginUserController(req, res) {
    try {
        const { email, password } = req.body;
        const user = await login({ email, password });
        if (!user) {
            return res.status(400).json("something wrong");
        }
        const token = createToken({ id: user._id, email: user.email });
        res.status(200).json({ message: "your in the system", token, user });
    } catch (error) {
        console.error(error.message);
        res.status(400).json("something wrong");
    }
}

export async function profileController(req, res) {
    try {
        const user = await getUserById(req.user.id);
        if (!user) {
            return res.status(404).json("user not found");
        }
        const { password, ...userData } = user;
        res.status(200).json(userData);
    } catch (error) {
        console.error(error.message);
        res.status(500).json("something wrong");
    }
}

export async function getAllUsersController(req, res) {
    try {
        const user = await getAllUsers();
        res.status(200).json(user);
    } catch (error) {
        console.error(error.message);
        res.status(400).json("something wrong with users");
    }
}
