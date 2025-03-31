import messages from '../locales/messages.json';

type MessageKey = keyof typeof messages['pt'];

export const getMessage = (key: MessageKey, lang: 'pt' | 'en' = 'pt'): string => {
    return messages[lang]?.[key] ?? key;
};