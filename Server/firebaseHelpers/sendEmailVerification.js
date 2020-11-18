const nodemailer = require("nodemailer");

function sendEmailVerification(email, link) {
  let mailTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'bilgiparkingpolicy@gmail.com',
      pass: 'bilgiuniparkingpolicy!'
    }
  });

  const mailOptions = {
    from: 'Bilgi University Parking Policy Support <Abc_Support@gmail.com>',
    to: email,
    subject: "Parking Policy",
    html:
      `<p style="font-size: 16px;">Thanks for signing up</p>
        <p style="font-size: 12px;">Pleas verify your account using: </p>
        <a href="${link}">${link}</a>
        <p style="font-size: 12px;">Best Regards,</p>
        <p style="font-size: 12px;">-Support Team</p>
      ` // email content in HTML
  };

  mailTransport.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    }
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  })
}

module.exports = sendEmailVerification

