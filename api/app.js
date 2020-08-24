const express = require('express');
const app = express();
const mongoose = require("mongoose");
const config = require("./config/config");
const adminRouter = require("./router/adminRouter");
const bookingRouter = require("./router/bookingRouter");
const port = 4000;

app.use(
    adminRouter,
    bookingRouter
);

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
  };

mongoose.connect(config.databaseURL, options).then(() => {
    console.log(`connecting to port: ${port}...`);
    app.listen(port);
    console.log(`connection successful`);
});


