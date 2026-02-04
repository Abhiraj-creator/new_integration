/*
    server.js starts the server and connects to db
*/

const app=require('./src/app');
const dotenv=require('dotenv').config();
const Connect_DB=require('./src/config/database');
Connect_DB()
app.listen(process.env.PORT||3000,()=>{
    console.log("connected to port 3000");
});