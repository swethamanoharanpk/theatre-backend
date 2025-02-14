const webToken = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const generateToken = (id)=>{
    const token = webToken.sign({id},process.env.jwtSecretkey,{expiresIn:'1d'})
    console.log("tttokennn",token)
    return token

}



const verifyUserToken = (req,res,next)=>{
    console.log(req.headers.token)

    try{
        const userToken = req.headers.token
        if(userToken){
            webToken.verify(userToken,process.env.jwtSecretkey,(err,data)=>{
                console.log("dataid",data.id,)
                console.log("paramsidddddddd",req.params.id)
                if(err){
                    return res.status(401).json('token not authorized')
                }
                if(req.params.id == data.id){
                    next()
                }else{
                    return res.status(401).json('token not matched')
                }
            })
        }else{
            return res.status(401).json("token not found")
        }

    }catch(err){
        res.status(500).json(err.message)
    }
}

const verifyAdminToken = (req,res,next)=>{
    try{
        const adminToken = req.adminheaders.token
        console.log("vrifyAdmintokennnnnnnn",adminToken)
        if(adminToken){
            webToken.verify(adminToken,process.env.jwtSecretkey,(err,data)=>{
                if(err){
                    return res.status(401).json('token not authorized')
                }
                if(req.params.id == data.id){
                    next()
                }else{
                    return res.status(401).json('token not matched')
                }
            })
        }else{
            return res.status(401).json('token not found')
        }

    }catch(err){
        return res.status(500).json(err.message)
    }

}

module.exports = {generateToken,verifyUserToken,verifyAdminToken}