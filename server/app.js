'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const DAO = require('./dao');
const authors = require('./routes/authors');
const books = require('./routes/books');

const PORT = 3000;

const app = express();
const dao = new DAO({
    host: 'localhost',
    port: 27017,
    name: 'testing'
});

/**
 * Middleware
 */
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));


/**
 * Routes
 */
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '../web/index.html'));
});
app.use('/api/authors', authors);
app.use('/api/books', books);

/**
 * Init database
 */
dao.init({}, (err) => {
    if (err) {
        console.error(err);
    }
    /**
     * Start app
     */
    app.listen(PORT, () => {
        console.log(`App listening on port ${PORT}!`);
    });
});

module.exports = app;
