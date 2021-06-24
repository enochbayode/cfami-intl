const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const EventsSchema = new Schema({
    title : {
        type:String
    },
    
    date : {
       type: Date
    },
    
    venue :{
        type:String
    },
    
    imgUrl: {
        type:String
    }
})




module.exports = mongoose.model('Events', EventsSchema);