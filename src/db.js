const mongoose = require('mongoose');
const URI = 'mongodb://localhost/simple-jwt';

mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(db => console.log('Database is connected to simple-jwt'));