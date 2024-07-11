import {Resend} from "resend";
import {attackAttemptTemplate} from "../mailsTemplates/attackAttemptMail.js";
//process.env.MAIL_KEY
const resend = new Resend('re_NoVRWYHG_Ddp3RdkrWoet3sFgAe1iMpep');
export const sendEmail = async (to, subject, mail) => {
	try {
		await resend.emails.send({
			from: 'onboarding@resend.dev',
			to: 'progrdnvictor@gmail.com',
			subject: 'Hello World',
			html: '<p>Congrats on sending your <strong>first email</strong>!</p>'
		});
		console.log("Email sent successfully");
	} catch (err) {
		console.error("Mail sending failed", err);
		throw new Error("Mail sending failed");
	}
};