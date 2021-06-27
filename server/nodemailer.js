const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
        user: 'waldo13@ethereal.email',
        pass: 'dje2jKzey3vBKPBKBN'
    }
},
{
    from: 'Mailer Test <waldo13@ethereal.email>',
});

const mailer = message => {
    transporter.sendMail(message, (err, info) => {
        if (err) return console.log(err);
        console.log('Email ok: ', info)
    })
}

module.exports = mailer;