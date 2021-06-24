const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const SadopSchema = new Schema({
    
    imgUrl: {
        type:String
    }
})



module.exports = mongoose.model('Sadop-program', SadopSchema);