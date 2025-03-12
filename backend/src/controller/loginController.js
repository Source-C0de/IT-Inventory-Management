
const dotenv = require('dotenv');
const express = require('express');
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



const models = require('../models/UserModel');

dotenv.config();

async function login(req,res) {
    try{
        const {email,password} = req.body;

        console.log(email);
        console.log(password);

        const user = await models.findByEmail(email);
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const secretKey = process.env.BCRYPT_SECRET_KEY || "";
        const isMatch = await bycrypt.compare(password + secretKey, user.password);
       
        if (!isMatch) {
          return res.status(401).json({ message: "Invalid email or password" });
        }

        console.log("this");
        // Generate JWT Token
        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
        
        console.log("this error",token);
    
        // Update last login timestamp
        await models.updateLastLogin(user.id);
    
        res.status(200).json({ message: "Login successful", token, user: { id: user.id, name: user.name, email: user.email, role: user.role, last_login: user.last_login } });

    }catch(error){
        console.error("❌ Error during login:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}


async function addUser(req,res) {
    try {
        const { name, email, password, role } = req.body;
    
        // Validate role (must be 'admin' or 'employee')
        if (!["admin", "employee"].includes(role)) {
          return res.status(400).json({ message: "Invalid role. Must be 'admin' or 'employee'." });
        }
    
        // Check if user already exists
        const existingUser = await models.findByEmail(email);
        if (existingUser) {
          return res.status(400).json({ message: "Email already exists." });
        }
    
        // Hash password
         // Hash password with secret key
        const salt = await bycrypt.genSalt(10);
        const secretKey = process.env.BCRYPT_SECRET_KEY || "";
        const hashedPassword = await bycrypt.hash(password + secretKey, salt);
    
        // Create new user
        const userId = await models.createUser(name, email, hashedPassword, role);
    
        res.status(201).json({ message: "User created successfully", userId });
      } catch (error) {
        console.error("❌ Error creating user:", error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    
}

async function updatePass(req,res) {
    try {
        const { currentPassword, newPassword } = req.body;
        const userId = 1; // Extracted from JWT
    
        // Fetch user from DB
        const user = await models.findById(userId);
        if (!user) {
          return res.status(404).json({ message: "User not found." });
        }
    
        // Verify current password
        const secretKey = process.env.BCRYPT_SECRET_KEY || "";
        //  const isMatch = await bycrypt.compare(currentPassword + secretKey, user.password);
        const isMatch = true;
        if (!isMatch) {
          return res.status(400).json({ message: "Current password is incorrect." });
        }
    
        // Hash new password
        const salt = await bycrypt.genSalt(10);
        const hashedPassword = await bycrypt.hash(newPassword + secretKey, salt);
    
        // Update password in DB
        await models.updatePassword(userId, hashedPassword);
    
        res.json({ message: "Password updated successfully." });
      } catch (error) {
        console.error("❌ Error updating password:", error);
        res.status(500).json({ message: "Internal Server Error" });
      }
}




module.exports = {
    login,
    addUser,
    updatePass

};