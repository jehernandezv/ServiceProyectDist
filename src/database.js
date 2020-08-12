const mongoose = require('mongoose');

mongoose.connect('mongodb://192.168.100.4/projectFinal', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('db is conected')).catch(err => console.log(err));