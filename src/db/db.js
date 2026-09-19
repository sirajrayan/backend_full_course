const mongoose= require('mongoose');

async function connectDB(){
    await mongoose.connect('mongodb+srv://rayansiraj88_db_user:xGdyP2LETDc7B5En@cluster0.drcmd2z.mongodb.net/studens');
    console.log('mongodb connected');
}
module.exports = connectDB;