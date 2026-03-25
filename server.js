const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());

app.use(express.static(path.join(__dirname, '/client')));

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '/client/index.html'));
});

const messages = [];





app.listen(process.env.PORT || 8000, () => {
    console.log('Server running on Port: 8000');
});