
const express=require('express')
const mongoose=require('mongoose')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')
const Register=require('../models/register')

const router=express.Router()


router.post('/register',async(req,res)=>{
    try{
        const {firstname,lastname,email,phonenumber,occupation,password}=req.body

        const exist=await Register.findOne({email})

        if(exist){
            return res.status(409).json({message:"User with suc email exists "})
        }
        const hashedpasword=await bcrypt.hash(password,10)

        const user=await Register.create({
            firstname,lastname,email,phonenumber,occupation,password:hashedpasword
        })
        return res.status(201).json({message:"User createdsuccessgully"})


    }
    catch(err){
        console.log(err)
        return res.status(500).json({message:"Server error "})
    }
})
router.post('/login',async(req,res)=>{
    try{
    const {email,password}=req.body

    const user=await Register.findOne({email})
    const ok=user && await bcrypt.compare(password,user.password)
    if(!ok){
        return res.status(401).json({message:"Invalid email or password"})
    }
    return res.status(201).json({message:"Login success"})

    }
    catch(err){
        console.log(err)
        return res.status(500).json({message:"server error"})

    }

})
module.exports=router;