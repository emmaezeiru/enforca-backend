require ('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 4000;
const User = require('./models/User');



mongoose.connect(process.env.MONGO_URI);
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));


app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res)=> {
    res.send("hello")
})

app.post("/signup", async (req, res) =>{
    const data = {
        email: req.body.email,
        password: req.body.password
    }

    const userdata = await User.insertMany(data);
    console.log(userdata);
})





// start the server
app.listen(port, () => {
    console.log(`i am listening on ${4000}`)
})
