import nodemailder from "nodemailer";

const transporter = nodemailder.createTransport({
	host: process.env.EMAIL_HOST,
	port: 587,
	secure: false,
	auth: {
		user: process.env.SMTP_USER,
		pass: process.env.SMTP_PASS,
	},
});

const sendMail = async (to, subject, text, html) => {
	await transporter.sendMail({
		from: `${process.env.SMTP_FROM_EMAIL}`,
		to,
		subject,
		text,
		html,
	});
};

const sendVerificationMail = async (to, token) => {
	await sendMail(
		to,
		(subject = "Verify your email"),
		(text = `Click on the link to verify your email http://localhost:3000/verify-email/${token}`),
		(html = `Click on the link to verify your email http://localhost:3000/verify-email/${token}`),
	);
};

export { sendMail, sendVerificationMail };
