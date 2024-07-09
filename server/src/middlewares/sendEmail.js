import nodemailer from 'nodemailer';


const mailTransport = nodemailer.createTransport({
	service: 'gmail',
	host: process.env.MAIL_HOST,
	port: process.env.MAIL_PORT,
	secure: false, // TODO: upgrade later with STARTTLS
	auth: {
		user: process.env.MAIL_USER,
		pass: process.env.MAIL_PASSWORD,
	},
});

export const sendEmail  = async (mailDetails, callback) => {
		return
	try {
			const info = await mailTransport.sendMail(mailDetails)
			callback(info);
		} catch (error) {
			console.log(error);
		}
	};

