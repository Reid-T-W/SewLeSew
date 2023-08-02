const express = require('express');
const router = require('./routes/index');
const bodyParser = require('body-parser');
// const path = require('path');
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('', router)

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server started on port ${PORT}`))