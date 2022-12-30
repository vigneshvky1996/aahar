const DBconnection = require('../db')
const bcrypt = require('bcrypt')

const connection = DBconnection.client

const signup = async(req,res)=>{
    try {
        const {email ,password, restaurantName, phoneNumber, addressLine1, addressLine2, 
            city, state, pincode, lattitude, longitude} = req.body
    
        const userExistence = await connection.query(`select * from public.user where "phoneNumber" =$1`, [phoneNumber])
        if(userExistence.rows[0] == null){
            const hashedPassword = await bcrypt.hash(password, 10)
            const newUser = await connection.query(`insert into public.user ("email" ,"password", "restaurantName", "phoneNumber", "addressLine1",
            "addressLine2", "city", "state", "pincode", "lattitude", "longitude") values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) returning *`, 
            [email, hashedPassword, restaurantName, phoneNumber, addressLine1, addressLine2, city, state, pincode, lattitude, longitude])
    
            res.status(200).json({status : 200, message : 'new user created', restaurantName : newUser.rows[0].restaurantName})
        }
        else{
            res.status(400).json({status : 400 , message : 'user already exist'})
        }
    } catch (error) {
        res.status(400).json({status : 400 , message : 'error occured '+error})
    }
       
}

module.exports = signup