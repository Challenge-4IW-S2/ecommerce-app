import {Resend} from "resend";
import {attackAttemptTemplate} from "../mailsTemplates/attackAttemptMail.js";
//process.env.MAIL_KEY
const resend = new Resend('re_NoVRWYHG_Ddp3RdkrWoet3sFgAe1iMpep');
export const sendEmail = async (to, subject,template) => {
	try {
		await resend.emails.send({
			from: 'onboarding@resend.dev',
			to: to,
			subject: subject,
			html: template
		});
		console.log("Email sent successfully");
	} catch (err) {
		console.error("Mail sending failed", err);
		throw new Error("Mail sending failed");
	}
};
const testSendEmail = async () => {
	const to = 'estelle27001@gmail.com'; // Replace with the recipient's email address
	const subject = 'Test Email Subject'; // Replace with the email subject
	const template = '<h1>Hello World</h1><p>This is a test email.</p>'; // Replace with your HTML template

	try {
		await sendEmail(to, subject, template);
	} catch (error) {
		console.error(error);
	}
};

// Run the test
testSendEmail();