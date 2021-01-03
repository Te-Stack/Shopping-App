const express = require("express")
const item = require("../model/item")
const auth = require("../middleware/auth")

//initialising express Router
const router = express.Router()

// @route GET api/items
// @desc Get All Items
// @access Public
router.get("/",(req,res)=>{
    item.find()
    .sort({date:-1})
    .then(items => res.json(items))
})





// @route POST api/items
// @desc Create a post 
// @access Public
router.post("/",auth,(req,res)=>{
    const newItem = new item({
        name:req.body.name
    })

    newItem.save()
    .then(item=>res.json(item))
})



// @route DELETE api/items
// @desc Delete an item
// @access Public
router.delete("/:id",auth,(req,res)=>{
    item.findById(req.params.id)
    .then(item.remove().then(()=>res.json({success:true})))
    .catch(err=>res.status(404).json({success:false}))
})

module.exports = router