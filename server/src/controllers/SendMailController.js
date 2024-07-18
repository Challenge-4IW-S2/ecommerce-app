import {Resend} from "resend";
const resend = new Resend(process.env.MAIL_KEY);
export const sendEmail = async (to, subject,template,res) => {
    try {
        const data = await resend.emails.send({
            from: 'Luzaya <noreply@luzaya.fr>',
            to: [to],
            subject: subject,
            html: template,
        });

        console.log(data)
    } catch (err) {
        console.log(err)
        console.error("Mail sending failed", err);
        throw new Error("Mail sending failed");
    }
};