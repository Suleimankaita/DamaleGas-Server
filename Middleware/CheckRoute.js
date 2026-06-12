const check=(req,res,next)=>{
    
    console.log(`${req.method} ${req.url} ${req.statusCode} ${req.ip}`)
next()
}

module.exports=check;