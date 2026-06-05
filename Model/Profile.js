const mongoose=require('mongoose');

const Profile=new mongoose.Schema({
    Firtsname:String,
    LastName:String,
    Password:String,
    Saller:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'CylinderSale'
    }],
    ActivityLog:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"ActivityLogs"
    }]
},{
    timestamps:true
})

module.exports=mongoose.model("Profile",Profile)