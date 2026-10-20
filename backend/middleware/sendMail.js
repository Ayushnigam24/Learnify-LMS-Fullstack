import { createTransport } from "nodemailer";

const sendMail = async (email, subject, data) => {
  try {
    const transport = createTransport({
      service: "gmail",             
      auth: {
        user: process.env.Gmail,
        pass: process.env.Password,  
      },
      tls: {
        rejectUnauthorized: false,   
      },
    });

    const html = `
<div className="main justify-center justify-items-center">
        <div className="box shadow-sm bg-gray-50">
          <div className="text justify-center justify-items-center p-4 rounded-t-2xl bg-blue-700">
            <h1 className='text-3xl font-extrabold text-white'>Learnify</h1>
          </div>
          <div className="content p-4">
            <p className='text-2xl font-bold'>Hello ${data.name}</p>
            <p>This is you OTP for Learnify</p>
            <div className=" mt-5 otp p-4 bg-blue-50 border-blue-600 border-dashed border justify-center justify-items-center">
              <h1 className='text-3xl font-bold'>${data.otp}</h1>
            </div>
            
          </div>
          <div className="bg-gray-100 justify-center justify-items-center p-2">
              <h1 className='text-sm'>Learnify . All rights reserved</h1>
          </div>
        </div>
        
      </div>


    `;

    await transport.sendMail({
      from: process.env.Gmail,
      to: email,
      subject,
      html,
    });

    console.log("Mail sent successfully");
  } catch (error) {
    console.error("SendMail Error", error);
    throw error;
  }
};

export default sendMail;



export const sendForgetMail = async (subject,data) => {
  const transport = createTransport({
      service: "gmail",             
      auth: {
        user: process.env.Gmail,
        pass: process.env.Password,  
      },
      tls: {
        rejectUnauthorized: false,   
      },
    });


    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f3f3f3;
      margin: 0;
      padding: 0;
    }
    .container {
      background-color: #ffffff;
      padding: 20px;
      margin: 20px auto;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      max-width: 600px;
    }
    h1 {
      color: #5a2d82;
    }
    p {
      color: #666666;
    }
    .button {
      display: inline-block;
      padding: 15px 25px;
      margin: 20px 0;
      background-color: #5a2d82;
      color: white;
      text-decoration: none;
      border-radius: 4px;
      font-size: 16px;
    }
    .footer {
      margin-top: 20px;
      color: #999999;
      text-align: center;
    }
    .footer a {
      color: #5a2d82;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Reset Your Password</h1>
    <p>Hello,</p>
    <p>You have requested to reset your password. Please click the button below to reset your password.</p>
    <a href="${process.env.frontendurl}/reset-password/${data.token}" class="button">Reset Password</a>
    <p>If you did not request this, please ignore this email.</p>
    <div class="footer">
      <p>Thank you,<br>Your Website Team</p>
      <p><a href="https://yourwebsite.com">yourwebsite.com</a></p>
    </div>
  </div>
</body>
</html>
`;

     await transport.sendMail({
      from: process.env.Gmail,
      to: data.email,
      subject,
      html,
    });


}