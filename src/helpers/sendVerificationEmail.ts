import { resend } from "@/lib/resend";
// import VerificationEmail2 from "../../emails/";
import { ApiResponse } from '@/types/ApiResponse';
import nodemailer from "nodemailer"

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {

    var smtpConfig = {
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // use SSL
      auth: {
        user: 'aekadam2002@gmail.com',
        pass: 'kfme epvo iwxs ouyc'
      }
    };
    var transport = nodemailer.createTransport(smtpConfig);

    // var transport = nodemailer.createTransport({
    //   host: "sandbox.smtp.mailtrap.io",
    //   port: 2525,
    //   auth: {
    //     user: "de829466a7cb9c",
    //     pass: "5d4435425ae5bf"
    //   }
    // });
    const mailOptions = {
      from: 'dev@aekadam.com',
      to: email,
      subject: 'WhisperBack Verification Code',
      html: `
<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verification Code</title>
    <style>
        @font-face {
            font-family: 'Roboto';
            src: url('https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2') format('woff2');
            font-weight: 400;
            font-style: normal;
        }
        body {
            font-family: 'Roboto', Verdana, sans-serif;
        }
    </style>
</head>
<body>
    <div style="display:none;">Here's your verification code: <!-- otp --></div>
    <section>
        <div>
            <h2>Hello ${username},</h2>
        </div>
        <div>
            <p>
                Thank you for registering. Please use the following verification code to complete your registration:
            </p>
        </div>
        <div>
            <p>${verifyCode}</p>
        </div>
        <div>
            <p>If you did not request this code, please ignore this email.</p>
        </div>
        <!-- Uncomment this block if you want to include the verification button -->
        
    </section>
</body>
</html>
`,
    }
    const mailResponse = await transport.sendMail(mailOptions);
    console.log(mailResponse)
    // console.log("send krna hai")
    // const response = await resend.emails.send({
    //   from: 'dev@aekadam.com',
    //   to: email,
    //   subject: 'Mystery Message Verification Code',
    //   react: VerificationEmail({ username, otp: verifyCode }),
    // });

    // console.log(response);

    // console.log("send hua hai")
    return { success: true, message: 'Verification email sent successfully.' };
  } catch (emailError) {
    console.error('Error sending verification email:', emailError);
    return { success: false, message: 'Failed to send verification email.' };
  }
}
