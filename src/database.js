const mongoose = require('mongoose');

mongoose.connect('mongodb://kamil018:12345@192.168.1.32:27017/projectFinal', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('db is conected')).catch(err => console.log(err));