const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const cors = require("cors") 
const path = require("path")


const app = express()

//Bodyparser
app.use(express.json())

//middlewares
//Use Routes
app.use("/api/items",require("./routes/items"))
app.use("/api/users",require("./routes/users"))
app.use("/api/auth",require("./routes/auth"))
// app.use("/api/auth/user",require("./routes/auth"))

//allow cross-origin requests
app.use(cors())

//PREPARING FOR DEPLOYMENT

//activating the dotenv package
dotenv.config()

//connecting to mongoDb
mongoose.connect(process.env.DATABASE_ACCESS,{ useUnifiedTopology: true,useCreateIndex:true },()=>{
    console.log("Database connected")
})


const port = process.env.PORT || 5000


//serve static assets if in production
if(process.env.NODE_ENV === "production"){
    //set static folder
    app.use(express.static("client/build"))

    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,"client","build","index.html"))
    })
}


app.listen(port,()=>{
    console.log(`Server running on ${port}`)
})


