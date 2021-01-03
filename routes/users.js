const express = require("express")
const User = require("../model/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
//const dotenv = require("dotenv")

//activating the dotenv package
//dotenv.config()



//initialising express Router
const router = express.Router()

//User Model

// @route POST api/users
// @desc Register New User 
// @access Public
router.post("/",(req,res)=>{
    const {name, email, password} = req.body;

    //Simple Validation
    if(!name || !email || !password){
        return res.status(400).json({msg:"Please enter all fields"})
    }

    //Check for existing User
    User.findOne({ email })
    .then(user =>{
        if(user){
            return res.status(400).json({msg:"User already exists"})
        }

        const newUser = new User({
            name,
            email,
            password
        })

        // Create salt & hash password 
        bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(newUser.password,salt,(err,hash)=>{
                if(err){throw err}
                newUser.password = hash
                newUser.save()
                    .then(user =>{
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
        })
    })
})




module.exports = router