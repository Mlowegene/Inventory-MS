import bcrypt from "bcrypt";
import User from "./models/User.js";
import connectionDB from "./db/connection.js";

const register = async () => {
  try {
    connectionDB();
    const hashPassword = await bcrypt.hash("admin", 10);
    const newUser = new User({
      name: "admin",
      email: "genemlowe@gmail.com",
      password: hashPassword,
      address: "Dar es salaam",
      role: "admin",
    });

    await newUser.save();
    console.log("admin user created successful");
  } catch (error) {
    console.log("failed to create admin user", error);
  }
};

register();
