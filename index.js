require ('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 4000;
const authRoutes = ('./routes/auth');


mongoose.connect(process.env.MONGO_URI);
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));


app.use(express.json());

app.use("/api/auth", authRoutes)



// start the server
app.listen(port, () => {
    console.log(`i am listening on ${4000}`)
})
