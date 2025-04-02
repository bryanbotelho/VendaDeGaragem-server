import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'seuemail@gmail.com',
    pass: 'suasenha',
  },
});

export const sendEmail = async (to: string, subject: string, text: string) => {
  await transporter.sendMail({
    from: 'seuemail@gmail.com',
    to,
    subject,
    text,
  });
};
