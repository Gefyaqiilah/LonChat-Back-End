var nodemailer = require('nodemailer')

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USERNAME, // generated ethereal user
      pass: process.env.EMAIL_PASSWORD, // generated ethereal password
    },
  });

  const sendEmailForgotPassword = async (email, code) =>{
    const emailTemplate = `<!DOCTYPE html>
    <html lang="en">
    
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Email</title>
      <style>
        body {
          background-color: #F9F9F9 !important;
          font-family: 'Helvetica Neue', Helvetica;
        }
    
        h1 {
          margin-top: 40px;
          text-align: center;
          color: #E0E0E0;
          font-weight: 500;
          font-size: 40px;
        }
    
        h2 {
          font-weight: 500;
          color: #556171;
        }
    
        .box {
          width: 500px;
          height: max-content;
          background-color: #FFFFFF;
          margin: 20px auto 0 auto;
          padding: 40px;
        }
    
        .desc {
          color: #8A7F8D;
          font-size: 14px;
          font-weight: 500;
          line-height: 20px;
        }
    
        .box .footer {
          color: #556171;
          font-size: 13px;
          font-weight: 500;
          text-align: left;
        }
    
        .footer {
          text-align: center;
          color: #556171;
          font-size: 13px;
          font-weight: 500;
          margin-top: 40px;
        }
    
        .btn {
          display: block;
          margin: 30px auto 0 auto;
          background-color: #7E98DF;
          color: white !important;
          border: none;
          width: 115px;
          font-size: 16px;
          border-radius: 5px;
          text-align: center;
          text-decoration: none;
          padding:15px;
          letter-spacing: 0.5em;
        }
    
        .email {
          color: #7289DA;
          text-decoration: none;
        }
    
        hr {
          margin-top: 40px;
    
        }
      </style>
    </head>
    
    <body>
      <div class="container">
        <h1>Telegram App - Gefy</h1>
        <div class="box mx-auto mt-5 p-5">
          <h2><span style="text-transform:capitalize">Forgot Password Code</span></h2>
          <p class="desc mt-3">This is the code to change your password, paste it directly in the input field</p>
          <label class="btn">${code}</label>
          <hr>
          <p class="footer">
            Need help? Contact our support team or hit us up on email <a
              class="email"href="mailto:${process.env.EMAIL_USERNAME}">click in here</a>
          </p>
        </div>
        <p class="footer">Sent by CoffeeShop Team 1</p>
      </div>
    </body>
    
    </html>`
    return new Promise((resolve, reject)=>{
      const message = {
        from: process.env.EMAIL_USERNAME, // sender address
        to: email, // list of receivers
        subject: "Fprgot Password", // Subject line
        // text: "Hello world?", // plain text body
        html: emailTemplate, // html body
      }
  
      transporter.sendMail(message, (error, info) => {
        if (!error) {
          resolve(info)
        }else{
          reject(error)
        }
      })
    })
  }

module.exports = sendEmailForgotPassword