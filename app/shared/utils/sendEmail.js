const nodemailer = require("nodemailer");

const sendMail = async (mail, msg) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "hebaamer413@gmail.com",
        pass: "jcta mklk dnyr mubl",
      },
    });

    const mailOptions = {
      from: "hebaamer413@gmail.com",
      to: mail,
      subject: "Verify Code",
      html: `<center> <h4>${msg}</h4></center>`,
    };

    // Send the email and await completion
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.response);
  } catch (error) {
    console.error("Failed to send email:", error);
  }
};

module.exports = sendMail;
