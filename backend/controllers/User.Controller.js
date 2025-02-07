import User from "../models/User.model.js";
import bcrypt from "bcryptjs";
import {asyncHandler} from "../middlewares/handler.js";
import createToken from "../utils/createToken.js";


const CreateUser = asyncHandler(async (req, res) => {
    const { userName, email, password } = req.body;

    if (!userName || !email || !password) {
        return res.status(400).json({ message: "Please fill all the fields" });
    }

    const userExists = await User.findOne({ email:req.body.email });
    console.log("here-------------------")
    console.log(userExists)
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const userNameexists=await User .findOne({userName:req.body.userName});
    if(userNameexists){
        return res.status(400).json({message:"Username already exists"})
    }
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
        userName,
        email,
        password: hashedPassword,
    });

    try {
        const createdUser = await user.save();

        // Set the token in the cookie
        createToken(res, createdUser._id);

        // Respond with user details and token
        res.status(201).json({
            _id: createdUser._id,
            userName: createdUser.userName,
            email: createdUser.email,
            isAdmin: createdUser.isAdmin,
        });
    } catch (error) {
        console.log(error)
       return res.status(500).json({message:"Server error"})
    }
});

export default CreateUser;


export const loginUser=asyncHandler(async(req,res)=>{
    const {email,password}=req.body;

    if(!email || !password){
        res.status(400);
        throw new Error("Please fill all the fields");
    }

    const user=await User.findOne({email});
    console.log(user)

    if(user){
        const isPasswordValid=await bcrypt.compare(password,user.password);

        if(isPasswordValid){
            createToken(res,user._id);
            res.status(200).json({
                _id:user._id,
                userName:user.userName,
                email:user.email,
                isAdmin:user.isAdmin
            })
    }
    else{
        res.status(401);
        throw new Error("Invalid credentials");
    }
}
   
    else{
        res.status(401);
        throw new Error("User not found");
    }



})


export const logout=asyncHandler(async(req,res)=>{
    res.cookie('jwt','',{
        httpOnly:true,
        expires:new Date(0),
       
    })
    res.status(200).json({message:"Logged out successfully"})
})


export const getAllUsers=asyncHandler(async(req,res)=>{
    console.log("here")
    const users=await User.find({});
    res.status(200).json(users);
})



export const getUserProfile=asyncHandler(async(req,res)=>{
    const user=await User.findById(req.user._id);

   if(user){
    res.json({
        _id:user._id,
        userName:user.userName,
        email:user.email,
    
    })
   }else{
         res.status(404);
         throw new Error("User not found");
   }




})

export const updateUserProfile=asyncHandler(async(req,res)=>{   
    const user=await User.findById(req.user._id);
    if(user){
        user.userName=req.body.userName || user.userName;
        user.email=req.body.email || user.email;
        if(req.body.password){
            const salt=await bcrypt.genSalt(10);
            user.password=await bcrypt.hash(req.body.password,salt);
        }
        const updatedUser=await user.save();
    

    res.json({
        _id:updatedUser._id,
        userName:updatedUser.userName,
        email:updatedUser.email,
        isAdmin:updatedUser.isAdmin,
    })
}else{
    res.status(404);
    throw new Error("User not found")
}
})