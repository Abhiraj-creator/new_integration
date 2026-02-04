const mongoose=require('mongoose');

function Connect_DB(){
    mongoose.connect(process.env.MONGODB_URI).then(()=>{
        console.log("connected to db");
    })
}

module.exports=Connect_DB;