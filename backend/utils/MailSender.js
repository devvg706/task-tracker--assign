const nodemailer = require('nodemailer');


const mailSender = async (email, title, body) =>{
    try{
        let transporter = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS,
            }
        })

        let info = await transporter.sendMail({
            from: "StudyQuest || By-vijay ghindodey",
            to:`${email}`,
            subject:`${title}`,
            html:`${body}`,
        })
        console.log(info);
        return info;
    }
    catch(error){
        console.log("ERROR IN MAILSENDER.JS:-", error.message);
    }
}

module.exports = mailSender;