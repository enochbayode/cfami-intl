const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const DisomSchema = new Schema({
    editor1: {
        type:String
    },
    imgUrl: {
        type:String
    }

})



module.exports = mongoose.model('Disom', DisomSchema);