const nodeMailer = require('nodemailer')
const dotenv = require('dotenv')
dotenv.config()

const transporter = nodeMailer.createTransport({
    service:'gmail',
    // port: 587,
    // secure: false, // true for port 465, false for other ports
    auth: {
      user: process.env.email,
      pass: process.env.password,
    },
  });


   const sendEmail = async(email,datas)=>{
    console.log('hreeeeeee',datas)
    console.log("kkkkkkkkkkkkkkkkk",email)
    const info = await transporter.sendMail({
        from: process.env.email, // sender address
        to: email,  // list of receivers
        subject: "Booking Details", // Subject line
        text: `your Booking deatils ${datas}`, // plain text body
      });
    
      console.log("Message sent: %s", info.messageId);
      
    }

    module.exports = sendEmail

  