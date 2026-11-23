const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { request } = require('http');

const router = express.Router();

router.post('/register', async (request, response) => {

    try {
        const { name, username, email, password, usertype } = request.body;

        const existinguser = await User.findOne({username});
        if (existinguser) {
            return response.status(400).json({ message: 'Username already exists' });
        }
        const existingemail = await User.findOne ({email});
        if (existingemail) {
            return response.status(400).json({ message: 'Email already exists' });
        }
        
        const hashPassword = bcrypt.hashSync(password, 10);

        const newUser =({
            name,
            username,
            email,
            password: hashPassword,
            usertype
        });

        const user = new User(newUser);
        await user.save();

        response.status(200).json({ message: 'User registered successfully' });
    }catch (error) {

    }
});

router.post('/login',async(request,response)=>{
    try{
        const{username,password}=request.body;
        const user=await User.findOne({username});

        if(!user){
            return response.status(404).json({message:"invalid username"});
        }
        const isMatch=await bcrypt.compare(password,user.password);

        if(!isMatch){
            return response.status(400).json({message:"Invalid Password"});
        }

        const token=jwt.sign({
            userId:user._id,
            username:user.username,
            email:user.email,
            userType:user.userType
        },process.env.JWT_SECRET,{expiresIn:'1hr'});
    }catch(error){
        response.status(500).json(error);
    }
})

module.exports=router;