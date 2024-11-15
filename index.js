require ('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 4000;

app.get("/", (req, res)=> {
    res.send("server is running")
})

app.listen(port, () => {
    console.log(`i am listening on ${4000}`)
})
