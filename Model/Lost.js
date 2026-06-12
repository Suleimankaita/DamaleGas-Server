const mongoose=require('mongoose');

const Lost=new mongoose.Schema({
    name:String,
    Lost:Number,    
    Time:{
        type:String,
        default:new Date().toLocaleTimeString()
    },
    Date:{
        type:String,
        default:new Date().toISOString().split('T')[0]
    },
},{
    timestamps:true
})

module.exports=mongoose.model('CylinderLost',Lost);