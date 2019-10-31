import * as functions from 'firebase-functions';7

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');

var twilio = require('twilio');
var accountSid = 'AC5d4f9607c3cad801bcd4e288f98b209d'; // Your Account SID from www.twilio.com/console
var authToken = 'b02b228ccfc88293e4dca03e3bfb0b25';   // Your Auth Token from www.twilio.com/console
var client = new twilio(accountSid, authToken);

export const function_send_mssg = functions.firestore.document('sms/{id}').onCreate((snap:any,context)=>{
    const data  = snap.data();
    const phone = data.phone;
    const verify = data.verify;
    client.messages.create({
        body: `Codigo de verificación: ${verify}`,
        to: phone,  // Text this number
        from: '961 194 7624' // From a valid Twilio number
    })
    .then((message:any) => console.log(message.sid));
});

export const function_send_email = functions.firestore.document('users/{id}').onCreate((snap:any,context)=>{
    const data  = snap.data();
    const email = data.email;
    const token = data.token;
    const url:string = `<a href="http://localhost:4200/activate-count/${token}">activar cuenta</a>`;
    const msg = {
        to: email,
        from: '163174@ids.upchiapas.edu.mx',
        subject: 'Actividad Email',
        text: 'Jesus Alberto Gonzalez Gutierrez 163174',
        html: url
    };
    sgMail.send(msg);
});

export const function_send_email_r_passwors = functions.firestore.document('recoveracount/{id}').onCreate((snap:any,context)=>{
    const data  = snap.data();
    const email = data.email;
    const token = data.token;
    const url:string = `<a href="http://localhost:4200/recover-password/${token}">recuperar contraseña</a>`;
    const msg = {
        to: email,
        from: '163174@ids.upchiapas.edu.mx',
        subject: 'Actividad Email',
        text: 'Jesus Alberto Gonzalez Gutierrez 163174',
        html: url
    };
    sgMail.send(msg);
})
