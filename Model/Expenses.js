const mongoose=require('mongoose');

const ExpensesShecma=new mongoose.Schema({
    Amount:Number,
    Description:String,
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

module.exports=mongoose.model('Expenses',ExpensesShecma);