const express = require("express")
const User = require("../model/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
//const dotenv = require("dotenv")
const auth = require("../middleware/auth")

//activating the dotenv package
//dotenv.config()



//initialising express Router
const router = express.Router()

//User Model

// @route POST api/auth
// @desc Auth User
// @access Public
router.post("/",auth,(req,res)=>{
    const { email, password} = req.body;

    //Simple Validation
    if(!email || !password){
        return res.status(400).json({msg:"Please enter all fields"})
    }

    //Check for existing User
    User.findOne({ email })
    .then(user =>{
        if(!user){
            return res.status(400).json({msg:"User Does not exists"})
        }
        // validate password
        bcrypt.compare(password,user.password)
            .then(isMatch=>{
                if(!isMatch){
                    return res.status(400).json({msg:"Invalid Credentials"})
                }
                jwt.sign(
                    {id: user.id},
                    process.env.JWT_SECRET,
                    {expiresIn: 3600},
                    (err,token)=>{
                        if(err){
                            throw err
                        }           
                        res.json({
                            token,
                            user: {
                                id:user.id,
                                name: user.name,
                                email:user.email
                            }
                        })
                    }
                )
            })
    })
        
    // @route GET api/auth/user
    // @desc Get user data 
    // @access Private
    router.get("/user",auth,(req,res)=>{
        User.findById(req.user.id)
            .select("-password")
            .then(user=> res.json(user))
    })
})


module.exports = router