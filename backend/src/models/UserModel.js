 const db = require("../config/mysqlDb");

class User {

    static async findByEmail(email) {
        const [result] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
        return result.length > 0 ? result[0] : null;
      }

      static async createUser(name, email, hashedPassword, role) {
        const [result] = await db.query(
          "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
          [name, email, hashedPassword, role]
        );
        return result.insertId; // Return new user ID
      }

      static async findById(userId) {
        const [result] = await db.query("SELECT * FROM users WHERE id = ?", [userId]);
        return result.length > 0 ? result[0] : null;
      }
    
      static async updatePassword(userId, newPassword) {
        await db.query("UPDATE users SET password = ? WHERE id = ?", [newPassword, userId]);
      }
    
      // Update last_login timestamp
      static async updateLastLogin(userId) {
        await db.query("UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = ?", [userId]);
      }
    
 }

 module.exports = User;