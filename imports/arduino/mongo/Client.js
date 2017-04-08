var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:3001/meteor');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Succesfull connect to mongo db - meteor');
});

module.exports = mongoose;