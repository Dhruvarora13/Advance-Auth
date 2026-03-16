import { mailtrapClient, sender } from "./mailtrap.config.js"
import { VERIFICATION_EMAIL_TEMPLATE, WELCOME_EMAIL_TEMPLATE, PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE} from "./emailTemplates.js";

export const sendVeriaficationEmail = async (email , verifiicationToken) => {
    const recipient = [{email}]

    try {
        const response = await mailtrapClient.send({
            from:sender,
            to: recipient,
            subject: "Verify your email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}",verifiicationToken),
            category: "Email Verification"
        })
    } catch (error) {
        console.log(`Error sending verification`, error);

        throw new Error(`Error sending verification email: ${error}`);
    }
}

export const sendWelcomeEmail = async (email, name) => {
    const recipient = [{email}];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            Subject: "Welcome to Auth",
            html : WELCOME_EMAIL_TEMPLATE.replace("{userName}",name),
            category: "Welcome Email",  
        })

        console.log("Email sent successfully", response)
    } catch (error) {
        console.error(`Error sending Welcome email`, error)
        throw new Error(`Error sending Welcome email : ${error}`)
    }
}

export const sendPasswordResetEmail = async (email, resetURL) =>{
    const recipient = [{email}];

    try {   
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Reset Your Password",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}",resetURL),
            category:"Reset Password",
        })
    } catch (error) {
        console.log(error);
        throw new Error(`Error sending Welcome email : ${error}`)
    }
}

export const sendResetSuccessEmail = async (email)=>{
      const recipient= [{email}];
      try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Password Reset Successful",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
            category:"Reset Password Successful", 
        })
      } catch (error) {
        console.log(error);
        throw new Error(`Error resetting password: ${error}`);
      }
}