import {Resend} from "resend";

const resend = new Resend(process.env.MAIL_KEY);
export const sendEmail = async (to, subject,template) => {
    try {

        const data = await resend.emails.send({
            from: 'Luzaya <noreply@luzaya.fr>',
            to: [to],
            subject: subject,
            html: template,
        });

    } catch (err) {
        throw new Error("Mail sending failed");
    }
};