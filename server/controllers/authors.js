'use strict';
const Author = require('../dao/author');
const mongoose = require('mongoose');
const controller = {};

/**
 * Send specific author entity by id
 * @param {Object} req - HTTP request object
 * @param {Object} res - HTTP response object
 * @returns {void}
 */
controller.getAuthorById = function (req, res) {
    //TODO implement
    res.send('');
}
/**
 * Send author collection
 * @param {Object} req - HTTP request object
 * @param {Object} res - HTTP response object
 * @returns {void}
 */
controller.getAuthors = function (req, res) {
    res.send('');
}

/**
 * Update author
 * @param {Object} req - HTTP request object
 * @param {Object} res - HTTP response object
 * @returns {void}
 */
controller.updateAuthor= function (req, res) {
    res.send('');
}

/**
 * Patch author
 * @param {Object} req - HTTP request object
 * @param {Object} res - HTTP response object
 * @returns {void}
 */
controller.patchAuthor= function (req, res) {
    res.send('');
}

/**
 * Create author
 * @param {Object} req - HTTP request object
 * @param {Object} res - HTTP response object
 * @returns {void}
 */
controller.createAuthor = function (req, res) {
    let id = req.body._id;

    if (!id) {
       id = new mongoose.Types.ObjectId();
    }

    const author = new Author({
        _id: id,
        email: req.body.email,
        firstName: req.body.firstName,
        secondName: req.body.secondName,
        book: req.body.book,
        birthDate: req.body.birthDate
    });

    author.save()
        .then(function(){
            res.status(201).send({author});
        })
        .catch(function(err){
            console.error(err);
        });
};

/**
 * Delete author
 * @param {Object} req - HTTP request object
 * @param {Object} res - HTTP response object
 * @returns {void}
 */
controller.removeAuthor= function (req, res) {
    res.send('');
}

module.exports = controller;