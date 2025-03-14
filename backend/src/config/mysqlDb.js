
const mysql = require('mysql2');

const dotenv = require('dotenv');


dotenv.config();

// const pool = mysql.createPool({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//     port: process.env.DB_PORT,
//     waitForConnections: true,
//     connectionLimit: 10,
//     queueLimit: 0
//   });

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });
  
  // Promisify for async/await usage
const db = pool.promise();
  
db.getConnection()
    .then(() => console.log("✅ Connected to MySQL Database!"))
    .catch((err) => console.error("❌ MySQL Connection Error:", err));


// async function DbConnection() {

//     try{
//         const connection = mysql.createConnection({
//             host: process.env.DB_HOST,
//             user: process.env.DB_USER,
//             password: process.env.DB_PASSWORD,
//             database: process.env.DB_NAME,
//             port: process.env.DB_PORT,
            
//         });
//         console.log("MySQL DB successfully connected");
//         return connection;
//     }catch(err){
//         console.error('Error connecting to MySQL Database:', err);
//     }
    
// }

module.exports = db;