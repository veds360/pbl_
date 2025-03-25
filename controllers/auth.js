const User=require('../models/User')

const {StatusCodes}=require('http-status-codes')
const bcrypt =require('bcryptjs')
const jwt =require('jsonwebtoken')
const {BadRequestError,UnauthenticatedError}=require('../errors')


const register =async (req,res)=>{
    // const{name,email,password}=req.body
    // const salt= await bcrypt.genSalt(10) //number of number bytes to be added in hashing
    // const hashPassword=await bcrypt.hash(password,salt)
    // const tempUser={name,email,password:hashPassword}
    // const user = await User.create({...tempUser}) // handled by pre save

    const user= await User.create({...req.body})
    // const token= jwt.sign({userId:user._id,name:user.name},'jwtSecret',{
    //     expiresIn:'30d'
    // }) //handled by mongoose middleWare

    const token =user.createJWT()
 
     res.status(StatusCodes.CREATED).json({user:{name:user.name},token}) //send back username and token , need username in front end
   // res.status(StatusCodes.CREATED).json({user:{name:user.getName()},token}) //send back username and token , need username in front end
}

const login = async (req,res)=>{
    const{email,password}=req.body

    if(!email || !password){
        throw new BadRequestError("please provide email and password")
    }

    const user= await User.findOne({email})

    if(!user){
        throw new UnauthenticatedError("invakid credentials")
    }

    const isPasswordCorrect= await user.comparePassword(password)

    

    if(!isPasswordCorrect){
        throw new UnauthenticatedError("invalid credentials")
    }

    const token =user.createJWT()
    res.status(StatusCodes.OK).json({user:{name:user.name},token})

}

module.exports={
register,login
}