import { mailgun, emailVerificationTemplate } from "../utils.js";

export const sendVerificationMail = (name, email, link) => {
    mailgun()
    .messages()
    .send(
      {
        from: 'Wazobia <assessment@wazobia.com>',
        to: `${name} <${email}>`,
        subject: `Wazobia Assesment: Verify your Email`,
        html: emailVerificationTemplate(name, link),
      },
      (error, body) => {
        if (error) {
            return { status: false, message: "Mail not sent", data: error };
        } else {
            console.log(body);
            return { status: true, message: "mail sent", data: body };
          
        }
      }
    );
}