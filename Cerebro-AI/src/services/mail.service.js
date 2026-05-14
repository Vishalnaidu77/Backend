import nodemailer from 'nodemailer'
import 'dotenv/config'

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        user: process.env.USER_EMAIL,
    }
});

transporter.verify()
    .then(() => console.log('Email service is ready to send message.'))
    .catch((err) => console.log(`Error connecting to the email server`, err))

const sendEmail = async ({to, subject, text, html}) => {
    try {
        const info = await transporter.sendMail({
            from: `Vishal <${process.env.USER_EMAIL}>`,
            to,
            subject,
            text,
            html
        })

        console.log(`Message sent to ${info.messageId}`);
    } catch (err) {
        console.log('Error sending email: ', err.message);
    }
}

export default sendEmail;