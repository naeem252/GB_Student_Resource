const nodemailer = require('nodemailer');

module.exports = class Email {
  constructor(student, url) {
    this.from = `gb student resource <${process.env.EMAIL_FROM}`;
    this.to = student.email;
    this.firstName = student.name.split(' ')[0];
    this.url = url;
  }
  newTransport() {
    return nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // use SSL
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }
  async send(html, subject) {
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
    };

    await this.newTransport().sendMail(mailOptions);
  }

  async emailConfirmation() {
    const html = `<h1>Please Confirm You email</h1> <p>Click <a href=${this.url}>Here</a> to confirm</p>`;
    await this.send(html, 'confirm email');
  }

  async passwordReset() {
    const html = `
        <h1>Password Reset</h1>
        <p>want to reset password?please click the link below</p>
        <a href=${this.url}>${this.url}</a>
        `;
    await this.send(html, 'password reset');
  }
};
