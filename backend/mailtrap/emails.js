import { VERIFICATION_EMAIL_TEMPLATE } from './emailTemplates.js'
import {mailTrapClient} from './mailtrap.config.js'

export const sendVerificationEmail = async (email, verificationToken) => {
    const recipient = [{email}]

    try {
        const response = await mailTrapClient.send({
            from:sender,
            to:recipient,
            subject: "Email Verification",
            html: VERIFICATION_EMAIL_TEMPLATE.replace('{verificationCode}', verificationToken),
            category: "Email Verification",
        })

        console.log("Email sent successfully", response);
        
    } catch (error) {
        console.error(`Failed to send verification email: ${error.message}`);
        throw new Error(`Failed to send verification email: ${error.message}`)
    }
}