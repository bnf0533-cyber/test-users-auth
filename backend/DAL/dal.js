import { ObjectId } from "mongodb";
import { db } from "../db/db.config.js";
import { comparePassword, hashPassword } from "../utils/hashPass.js";

const users = db.collection("users");

export async function registerUser({ username, email, password }) {
    const exist = await getUserByEmail(email);
    if (exist) {
        return null;
    }
    const hash = await hashPassword(password);
    const newUser = {
        username,
        email,
        password: hash,
    };
    const user = await users.insertOne(newUser);
    const { insertedId } = user;
    newUser._id = insertedId;
    return newUser;
}

export async function getUserByEmail(email) {
    const exist = await users.findOne({ email });
    return exist;
}

export async function getUserById(id) {
    try {
        const exist = await users.findOne({ _id: new ObjectId(id) });
        return exist;
    } catch {
        return null;
    }
}

export async function login({ email, password }) {
    const user = await getUserByEmail(email);
    if (!user) return null;
    const compare = await comparePassword(password, user.password);
    if (compare) return user;
    return null;
}

export async function getAllUsers() {
    const allUser = await users.find().toArray();
    return allUser;
}
