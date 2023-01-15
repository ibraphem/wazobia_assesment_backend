import { mailgun, recieptEmailTemplate } from "../utils.js";

export const sendMail = (name, email) => {
    mailgun()
    .messages()
    .send(
      {
        from: 'WazobiaAssessment <assessment@wazobia.com>',
        to: `${name} <${email}>`,
        subject: `Wazobia Assesment: Verify your Email`,
        html: recieptEmailTemplate(name),
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