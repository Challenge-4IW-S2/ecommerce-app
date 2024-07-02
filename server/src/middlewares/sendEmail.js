import nodemailer from 'nodemailer';
import ejs from ejs;


const mailTransport = nodemailer.createTransport({
	host: process.env.MAIL_HOST,
	port: process.env.MAIL_PORT,
	secure: false, // TODO: upgrade later with STARTTLS
	auth: {
		user: process.env.MAIL_USER,
		pass: process.env.MAIL_PASSWORD,
	},
});

const sendEmail = async ({ receipients, subject, message, template }) => {
  const html = await ejs.renderFile(__dirname + '/views/' + template + '.ejs', message, { async: true })
	return await mailTransport.sendMail({
		from: process.env.MAIL_SENDER_DEFAULT, 
		to: receipients,
		subject: subject,
    template:template,
		text: html,
		html: html, 
	});
}

module.exports = { sendEmail };
