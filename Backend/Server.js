require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const auth = require('./Auth-Routers/Auth-Routers')
const pay = require('./Payment/Payment-Router')

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log('MongoDB Connected');
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    });

app.use('/api/auth',auth) 
app.use('/api/pay',pay) 



app.listen(1300, () => {
    console.log("Server is running on port 1200");
});