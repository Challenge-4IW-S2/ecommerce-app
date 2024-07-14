import {Resend} from "resend";
import {attackAttemptTemplate} from "../mailsTemplates/attackAttemptMail.js";
//process.env.MAIL_KEY
const resend = new Resend('re_NoVRWYHG_Ddp3RdkrWoet3sFgAe1iMpep');
export const sendEmail = async (to, subject,template) => {
	try {
		await resend.emails.send({
			from: 'onboarding@resend.dev',
			to: 'progrdnvictor@gmail.com',
			subject: 'Hello World',
			html: template
		});
		console.log("Email sent successfully");
	} catch (err) {
		console.error("Mail sending failed", err);
		throw new Error("Mail sending failed");
	}
};