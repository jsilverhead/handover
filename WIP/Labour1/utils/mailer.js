import * as nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport(
  {
    host: 'smtp.mail.ru',
    port: 465,
    secure: true,
    auth: {
      user: 'anelf@bk.ru',
      pass: 'rqEbYfHfsVvJa9BvB3g6',
    },
  },
  {
    from: 'Rent A House Service <anelf@bk.ru>',
  }
);

const mailer = (message) => {
  transporter.sendMail(message, (err, info) => {
    if (err) console.log(err);
    console.log('Message sent', info);
  });
};

export default mailer;
