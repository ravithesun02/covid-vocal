import nodeMailer from 'nodemailer';
import config from '../../config/config';

var transporter=nodeMailer.createTransport({
    host:"smtp.gmail.com",
    port: 587,
    secure: false,
    auth:{
        user:config.emailFrom,
        pass:config.password
    }
});

const sendEmail=async(emailTo,token)=>{
    var mailOptions={
        from:config.emailFrom,
        to:emailTo,
        subject:"Verification code for PuchoLifeScience Access",
        text:`Please do not share this code with anyone . Please enter this code \n ${token}`    
    };

   let info= await transporter.sendMail(mailOptions);

   return info;

}

export default {sendEmail};
