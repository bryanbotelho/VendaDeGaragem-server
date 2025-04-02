import nodemailer from 'nodemailer';

const { EMAIL_USER, EMAIL_PASS } = process.env;

class MailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });
  }

  public async sendMail(to: string, subject: string, text: string) {
    try {
      const info = await this.transporter.sendMail({
        from: `"Suporte do App" <${EMAIL_USER}>`,
        to,
        subject,
        text,
      });

      return { success: true, data: info.messageId };
    } catch (error) {
      console.error('Erro ao enviar e-mail:', error);
      return { success: false };
    }
  }
}

export default new MailService();
