const mongoose = require('mongoose');

const connectDB = async () => {
    try{
        const conn = await mongoose.connect( "mongodb+srv://seb:seb123@jeuxwebmiage.5ipak5d.mongodb.net/?appName=jeuxwebmiage" || process.env.DB_URL);
        console.log(`Mongo DB Connected : ${conn.connection.host}`)
    }catch(error){
        console.error(`Error : ${error.message}`)
    }
}

module.exports = connectDB