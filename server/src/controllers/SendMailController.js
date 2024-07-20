import {Resend} from "resend";
console.log(process.env.MAIL_KEY)

const resend = new Resend(process.env.MAIL_KEY);

console.log(resend)

export const sendEmail = async (to, subject,template) => {
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