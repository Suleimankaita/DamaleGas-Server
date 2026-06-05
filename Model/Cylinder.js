const mongoose=require('mongoose');

const cylinderShecma=new mongoose.Schema({
    name:String,
    Weight:Number,
    RemainingKg:Number,
    Kg:Number,
    Price:Number,
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

module.exports=mongoose.model('Cylinder',cylinderShecma);