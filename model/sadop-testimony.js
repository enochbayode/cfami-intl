const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const SADOPSchema = new Schema({
    name: {
        type:String
    },
    imgUrl: {
        type:String
    },
    editor1:{
        type:String
    }

})



module.exports = mongoose.model('Sadop-testimony', SADOPSchema);