
const allowed=["http://localhost:3500/","http://localhost:5173",'https://damale-gas.vercel.app']

const opt={
    origin:(origin,cb)=>{
    if(allowed.includes(origin)||!origin ){
        cb(null,true)
    }else{
        cb(new Error("Not Allowed by Origin "))

    }
    },
    credentials: true,
  optionsSuccessStatus: 200
}

module.exports=opt