
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
      secure: true,
      auth: {
        user: 'aekadam2002@gmail.com',
        pass: 'kfme epvo iwxs ouyc'
      }
    };
    var transport = nodemailer.createTransport(smtpConfig);

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
    return { success: true, message: 'Verification email sent successfully.' };
  } catch (emailError) {
    console.error('Error sending verification email:', emailError);
    return { success: false, message: 'Failed to send verification email.' };
  }
}
