const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
  const transporter = nodemailer.createTransport({
    host: 'mail.candeloroanthony.it', // Sostituisci con il tuo server SMTP
    port: 465, // Porta sicura SSL
    secure: true,
    auth: {
      user: process.env.EMAIL, //
      pass: process.env.EMAIL_PASSWORD //
    },
    tls: {
      rejectUnauthorized: false // Solo per testing, rimuovi in produzione
    }
  });

  const { subject, message } = req.body;

  await transporter.sendMail({
    from: '"CyberSite" <noreppo@candeloroanthony.it>',
    to: process.env.EMAIL,
    subject: `[CYBER ALERT] ${subject}`,
    text: message,
    html: `<pre style="color:#4AF626;background:#001100;padding:20px;border:2px solid #4AF626">${message}</pre>`
  });

  res.status(200).json({ status: 'quantum_encrypted' });
};