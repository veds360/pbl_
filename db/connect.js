
const mongoose=require('mongoose')


// const connectionString='mongodb+srv://ved:veddb@node-express.8trpv.mongodb.net/03-TASK-MANAGER?retryWrites=true&w=majority&appName=Node-express'

const connectDB=(url)=>{
    return mongoose.connect(url,{
    
    })
} //this func effectively return a promise

module.exports=connectDB