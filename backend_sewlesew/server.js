require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
const router = require('./routes/index');

const app = express();

app.use(cors({
    origin: ["http://localhost:3000", "https://checkout.chapa.co"],
    credentials: true
}));

// app.use(cors());

app.use(express.json());

app.use(cookieParser());

app.get('/', (req, res) => res.send('API Running'));

const PORT = process.env.PORT || 5000;

// app.use('', router);
app.use('', router)
app.listen(PORT, console.log(`Server started on port ${PORT}`));