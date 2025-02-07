import jwt from 'jsonwebtoken';
import User from '../models/User.model.js';
import { asyncHandler } from './handler.js';

const protect = asyncHandler(async (req, res, next) => {
    let token=req.cookies.jwt;
    console.log(req.cookies.jwt)
    if(token){
      try{
       
            const decoded=jwt.verify(token,process.env.JWT_SECRET);
            console.log(decoded)
            req.user=await User.findById(decoded.userId).select('-password');
            console.log("---------------------------------------------")
            console.log(req.user)  // select('-password') means that password will not be shown in the response
            next();
        }
    catch(error){
          console.error(error);
          res.status(401);
          throw new Error('Not authorized, token failed');
      }
    }
    else{
        res.status(401);
        throw new Error('Not authorized, no token');
    }
  
   
}); 
    
//check if user is admin
const AuthorizeAdmin=(req,res,next)=>{
    console.log(req.user.isAdmin)
    if(req.user && req.user.isAdmin){
        next();
    }
    else{
        res.status(401);
        throw new Error('Not authorized as an admin');
    }
}



export {protect,AuthorizeAdmin};


