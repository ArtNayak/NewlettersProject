const jwt=require('jsonwebtoken');

const authMiddleware=(request,response,next)=>{
    const token= request.header('x-auth-token');

    if(!token){
        return response.status(401).json({message:"no token"});
    }

    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        request.user=decoded;
        next();
    }
    catch(error){
        response.status(500).json({message:"token not token"});
    }
};

module.exports=authMiddleware;