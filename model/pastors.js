const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const PastorSchema = new Schema({
    name: {
        type:String
    },
    imgUrl: {
        type:String
    }
})



module.exports = mongoose.model('Pastor', PastorSchema);