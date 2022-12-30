const DBconnection = require('../db')
const bcrypt = require('bcrypt')

const connection = DBconnection.client

const login = async(req,res)=>{
    try {
        const{phoneNumber , password} = req.body
        const userExistence = await connection.query(`select * from public.user where "phoneNumber" =$1`, [phoneNumber])
        if(userExistence == null){
            res.status(400).json({status : 400 , message : 'user does not exist '})
        }
        else{
            if(bcrypt.compare(password, userExistence.rows[0].password)){
                res.send('correct password')
            }
            else{
                res.send('wrong password')
            }
        }
    } catch (error) {
        res.status(400).json({status : 400 , message : 'error occured '+error})
        
    }
    // const{phoneNumber , password} = req.body
    // const userExistence = await connection.query(`select * from public.user where "phoneNumber" =$1`, [phoneNumber])
    // if(userExistence == null){
    //     res.status(400).json({status : 400 , message : 'user does not exist '})
    // }

}

module.exports = login