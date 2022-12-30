const express = require('express')
const signup = require('../controller/register')
const login = require('../controller/login')

const router = express.Router()

router.post('/create-user', function async(req,res){
    signup(req,res)

})

router.post('/login' , function async(req,res){
    login(req,res)
})


module.exports = router