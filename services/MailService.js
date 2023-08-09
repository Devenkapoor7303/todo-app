/**
 * interceptor for user permissions
 * */

const nodemailer=require("nodemailer");

class MailService {

    static async sendMail(to,subject,text="HI the Task has been assigned to You") {
        try {
            const transporter = nodemailer.createTransport({
                // Configure your mail transporter (SMTP or other)
                service: "gmail",
               
                auth: {
                    user: "devenkapoor7303@gmail.com",
                    pass: "wrvignkdhtaucwvi",
                },
               
            });

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
}

exports = module.exports = MailService;
