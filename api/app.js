const express = require('express');
const app = express();
const mongoose = require("mongoose");
const config = require("./config/config");
const adminRouter = require("./router/adminRouter");
const bookingRouter = require("./router/bookingRouter");
const cors = require("cors");

const bodyParser = require('body-parser');


app.use(
    adminRouter,
    bookingRouter
);
app.use(cors());
app.use(bodyParser.json());


const port = 4000;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
  };

mongoose.connect(config.databaseURL, options).then(() => {
    console.log(`connecting to port: ${port}...`);
    app.listen(port);
    console.log(`connection successful`);
});


