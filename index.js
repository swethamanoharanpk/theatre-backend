const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
const cors = require('cors')
app.use(cors())
const userRouter = require('./router/userRouter')
const adminRouter = require('./router/adminRouter')


mongoose.connect(process.env.mongoValue).then(()=>{
    console.log('database connected')
}).catch((err)=>{console.log(err.message)})


app.use(express.json())
app.use('/user',userRouter)
app.use('/admin',adminRouter)


const port = process.env.PORT || 4000



app.listen(port,()=>{console.log('port is connected')})