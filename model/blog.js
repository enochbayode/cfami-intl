const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const blogSchema = new Schema({
    title : {
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

    editor1: {
        type:String
    }

})


module.exports = mongoose.model('blog', blogSchema);