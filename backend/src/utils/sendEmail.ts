import nodemailer from "nodemailer";
import { config } from "../config/config";

export const sendEmail = async (email: string, verifyUrl: string) => {
  const testAccount = await nodemailer.createTestAccount();//for testing
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  await transporter.sendMail({
    from: config.email_from,
    to: email,
    subject: "Verify Your Email",
    html: `
            <h2>Email Verification</h2>
            <p>Click below to verify your email:</p>
            <a href="${verifyUrl}">Verify Email</a>
        `,
  });
};
