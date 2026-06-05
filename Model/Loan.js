const mongoose=require('mongoose');

const LoanShecma=new mongoose.Schema({
    Customername:String,
    Kg:Number,
    name:String,
    ActualPrice:Number,
    SalePrice:Number,
    Amount:Number,
    Types:{
        type:String,
        enum:["Gas","Money"],
        default:"Gas"
    },
    Paid:{
        type:String,
        enum:["Paid","Unpaid"],
        default:"Unpaid"
    },

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

module.exports=mongoose.model('Loan',LoanShecma);