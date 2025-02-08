import jwt from 'jsonwebtoken';

const createToken = (res,userId) => {

  const token=jwt.sign({userId},process.env.JWT_SECRET,{
    expiresIn:"30d"
  })
console.log(token)
  // set jwt as an http cookie

  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',  // Only send over HTTPS if not in development
    sameSite: process.env.NODE_ENV === 'development' ? 'lax' : 'none',
    maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
  });
  
return token

}

export default createToken;