const express = require("express");
const dotenv = require('dotenv');

dotenv.config();
const app = express();
const PORT =  process.env.PORT || 3000;

const connectDB = require('./config/mysqlDb');


// connectDB.db();

app.use(express.json());


const loginRoute = require('./routes/loginRoute');
app.use('/api/auth/',loginRoute);


app.get('/', (req,res) => {
    res.send("hello world");
});


app.listen (PORT, () =>{
    console.log(`Server is running on http://localhost:${PORT}`);
});

// module.exports = app;
 