const nodemailer = require('nodemailer');

export default async function handler(req, res) {
    const transporter = nodemailer.createTransport({
        host: 'mail.candeloroanthony.it', // SMTP del tuo hosting
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    try {
        await transporter.sendMail({
            from: `"Cyber Contact" <${process.env.EMAIL}>`,
            to: process.env.EMAIL,
            subject: `New Message: ${req.body.subject}`,
            text: req.body.message,
            html: `<pre style="font-family: 'JetBrains Mono',monospace;color:#4AF626;background:#001100;padding:20px;border:2px solid #4AF626">${req.body.message}</pre>`
        });
        res.status(200).json({ status: 'success' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
