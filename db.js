const {Client} = require('pg')

const client = new Client({
    host : 'localhost',
    port : 5432,
    user : 'postgres',
    password : '1234',
    database : 'userDb'
})

const connectToDb = ()=>{
    try {
        connectionStatus = client.connect()
        if(connectionStatus) console.log('connected to DB')
        else console.log('error occured') 
    } catch (error) {
        console.log('error occured '+error);
    }
}

module.exports = {connectToDb ,client}