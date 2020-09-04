const express = require('express');
const app = express();
const mongoose = require("mongoose");
const config = require("./config/config");
const adminRouter = require("./router/adminRouter");
const bookingRouter = require("./router/bookingRouter");
const cors = require("cors");
const bodyParser = require('body-parser');

app.use(cors());
app.use(
    adminRouter,
    bookingRouter
);

app.use(express.urlencoded({
    extended: true
}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const PORT = process.env.PORT || 4000;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
  };

mongoose.connect(config.databaseURL, options).then(() => {
    console.log(`connecting to port: ${PORT}...`);
    app.listen(PORT);
    console.log(`connection successful`);
});


