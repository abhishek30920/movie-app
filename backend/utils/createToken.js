import jwt from 'jsonwebtoken';

const createToken = (res,userId) => {

  const token=jwt.sign({userId},process.env.JWT_SECRET,{
    expiresIn:"30d"
  })

  // set jwt as an http cookie

res.cookie('jwt',token,{
    httpOnly:true,
    secure:process.env.NODE_ENV !== 'development',
    maxAge:30*24*60*60*1000,
    sameSite: 'strict'
})

return token

}

export default createToken;