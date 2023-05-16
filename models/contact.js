const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name : {
        type: String,
        required:true
    },
    phone : {
        type: String,
        required:true
    }
});

//Naming convention to keep the first letter capital in case of creating the collection name
const Contact = mongoose.model('contact',contactSchema);

module.exports = Contact;