import nodeMailer from 'nodemailer';
import config from '../../config/config';

var transporter=nodeMailer.createTransport({
    host:"smtp.zoho.com",
    port: 587,
    secure: false,
    auth:{
        user:config.emailFrom,
        pass:config.password
    }
});

const sendEmail=async(emailTo,content)=>{
    var mailOptions={
        from:config.emailFrom,
        to:emailTo,
        subject:"Verification code for PuchoLifeScience Access",
        text:content  
    };

   let info= await transporter.sendMail(mailOptions);

   return info;

}

export default {sendEmail};
