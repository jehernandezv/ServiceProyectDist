const mongoose = require('mongoose');

mongoose.connect('mongodb://root:123456@192.168.0.114:27017/projectFinal', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('db is conected')).catch(err => console.log(err));