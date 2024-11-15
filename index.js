require ('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
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

    const existingUser = await User.findOne({email: data.email})

    if (existingUser) {
        res.send("Email already exists. please choose another email.")
    }else {

        const hashedPassword = await bcrypt.hash(data.password, 10);
        data.password = hashedPassword;

        const userdata = await User.insertMany(data);
        console.log(userdata);
    }
});


app.post("/login", async (req, res) => {
    try {
        const check = await User.findOne({email: req.body.email});
        if(!check) {
            res.send("Email not found");
        }else {
            const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
            if(isPasswordMatch) {
            res.send("Login successful")
            }else {
            res.send("Wrong password")
            }
        }  
    }catch {
        res.send("Wrong Details")
    }
});





// start the server
app.listen(port, () => {
    console.log(`i am listening on ${4000}`)
})
