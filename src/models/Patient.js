const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
    name:{
        type: String
    },
    city:{
        type: String
    },
    UrlImage:{
        type: String
    }
},{timestamps:true});

const Patient = mongoose.model('patients', PatientSchema);

module.exports = Patient;