const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const messageSchema = new Schema({
    
    title : {
        type:String
    },

    name : {
        type:String
    },
    
    date : {
       type: Date
    },
    
    category :{
        type:String
    },

    excerpt:{
        type:String
    },
    
    imgUrl: {
        type:String
    },

    fileUrl: {
        type:String
    }

})



module.exports = mongoose.model('Sermon', messageSchema);