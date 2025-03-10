const express = require("express");
const app = express();
const PORT =  process.env.PORT || 3000;

const connectDB = require('./config/mysqlDb');


connectDB.DbConnection();


app.get('/', (req,res) => {
    res.send("hello world");
});


module.exports = app;
