import jwt from 'jsonwebtoken';

const createToken = (res,userId) => {

  const token=jwt.sign({userId},process.env.JWT_SECRET,{
    expiresIn:"30d"
  })
console.log(token)
  // set jwt as an http cookie

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development' ? true : false, // Secure only in production
    maxAge: 30 * 24 * 60 * 60 * 1000,
    sameSite: 'none',
});


return token

}

export default createToken;