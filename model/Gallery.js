const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const GallerySchema = new Schema({
    
    imgUrl: {
        type:String
    }
})



module.exports = mongoose.model('Gallery', GallerySchema);