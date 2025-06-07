import twilio from 'twilio';

const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER } = process.env;

class TwilioService {
    private client;
    private twilioPhone: string;

    constructor() {
        this.client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
        this.twilioPhone = TWILIO_PHONE_NUMBER as string;
    }

    async sendSMS(to: string, message: string) {
        try {
            const response = await this.client.messages.create({
                body: message,
                from: this.twilioPhone,
                to
            });

            return { success: true, data: response.sid };
        } catch (error) {
            console.error('Erro ao enviar SMS:', error);
            return { success: false };
        }
    }
}

export default new TwilioService();

