const express= require('express')
const bcrypt = require('bcrypt')
const DBconnection = require('./app/db')
const router = require('./app/routes/auth')

const app= express()
app.use(express.json())
app.use('/' , router)


DBconnection.connectToDb()
const connection = DBconnection.client

app.get('/get-users' , (req,res)=>{
    connection.query('select * from userDetails', (err, result)=>{
        if(!err) res.send(result.rows)
        else res.send('error occured '+err)
    })
})

app.listen(3000 , ()=> console.log('listening to port 3000') )