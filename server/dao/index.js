let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Author = require('../dao/author');

/**
 * Data Access Layer
 *
 * @constructor
 * @param {Object} config - database config
 */
function DAO(config) {
    this.config = config;
}

/**
 * Create database instance and load init data
 * @param {Object} data - init database data
 * @param {Function} callback - two params err, callback result
 * @returns {void}
 */
DAO.prototype.init = function (data, callback) {
    let host = this.config.host,
        port = this.config.port,
        name = this.config.name;
    let counter = 0;

    mongoose
        .connect(
            `mongodb://${host}:${port}/${name}`,
            {
                useFindAndModify: false,
                useNewUrlParser: true,
                auto_reconnect: true,
                reconnectTries: Number.MAX_VALUE,
                autoIndex: false,
                reconnectInterval: 1000
            }
        )
        .then(function(connection) {
            if (data && data.collections) {
                data.collections.forEach((collection) => {
                    if (collection.name === 'authors') {
                        collection.rows.forEach((authorData) => {
                            const author = new Author(authorData);
                            author.save()
                                .then(function() {
                                    counter++;
                                    if (counter === collection.rows.length){
                                        callback && callback(null, connection);
                                    }
                                })
                                .catch(function(err) {
                                    callback && callback(err);
                                });
                        });
                    }
                });
            }
        })
        .catch(function(error) {
            callback && callback(error);
        });
};

/**
 * Clear database
 * @param {Function} callback - two params err, callback result
 * @returns {void}
 */
DAO.prototype.clear = function(callback) {
    Author.deleteMany({})
        .then(function (result) {
            callback && callback(null, result);
        })
        .catch(function (err) {
            callback && callback(err);
        });
};

module.exports = DAO;