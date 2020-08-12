const mongoose = require('mongoose');

mongoose.connect('mongodb://superAdmin:pass1234@192.168.0.114:27017/projectFinal', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('db is conected')).catch(err => console.log(err));