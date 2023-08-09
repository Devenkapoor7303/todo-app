const nodemailer = require("nodemailer");


     async function sendMail(to, subject,text) {
        try {
            const transporter = nodemailer.createTransport({
                // Configure your mail transporter (SMTP or other)
                service: "gmail",
               
                auth: {
                    user: "devenkapoor7303@gmail.com",
                    pass: "wrvignkdhtaucwvi",
                },
               
            });

            // const invitationLink = `http://localhost:3000/invitation/${inviteToken}`;

            const mailOptions = {
                from: "tushrtygi12@gmail.com",
                to: to,
                subject: subject,
                text:text
                
              ,
            };
             
            await transporter.sendMail(mailOptions);
        } catch (error) {
            console.error("Error sending email:", error);
        }
        
    }

exports=module.exports={sendMail}