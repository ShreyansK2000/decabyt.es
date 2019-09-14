import twilio from 'twilio';
require('dotenv').config();

/**
 * Sends an SMS, after verifying the details.
 * @param {string} to 
 * @param {string} body 
 */
export default function sms(to, body) {
    return new Promise((resolve, reject) => {
        let client = twilio(process.env.TWILIO_ACCOUNT_ID, 
                            process.env.TWILIO_AUTH_TOKEN);

        let payload = {
            "to": to,
            "body": body,
            "from": process.env.TWILIO_PHONE_NUMBER
        };
    
        client.messages.create(payload)
                       .then(message => resolve(message.status),
                             message => reject(message.status));
    });
}