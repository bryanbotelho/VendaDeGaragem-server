import twilio from 'twilio';

const accountSid = 'SEU_ACCOUNT_SID';
const authToken = 'SEU_AUTH_TOKEN';
const client = twilio(accountSid, authToken);

export const sendSMS = async (to: string, message: string) => {
  await client.messages.create({
    body: message,
    from: '+SEU_NUMERO_TWILIO', // Número registrado no Twilio
    to,
  });
};
