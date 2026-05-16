import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        user: process.env.USER_EMAIL
    }
})

transporter.verify()
    .then(() => console.log('Email service ready to send email'))
    .catch((err) => console.log(`Error while sending mail: `, err))

export const sendMail = async ({ to, subject, text = "", html}) => {
    try {
        const info = transporter.sendMail({
            from: `Vishal <${process.env.USER_EMAIL}>`,
            to,
            subject,
            text,
            html
        })

        return "Email sent successfully to " + to
    } catch (err) {
        console.log(err.message);
    }
}