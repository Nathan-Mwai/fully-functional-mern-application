import { VERIFICATION_EMAIL_TEMPLATE } from './emailTemplates.js'
import {mailTrapClient, sender} from './mailtrap.config.js'

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

export const sendWelcomeEmail = async (email, name) => {
    const recipient = [{email}]

    try {
        
        const response = await mailTrapClient.send({
            from:sender,
            to:recipient,
            template_uuid: "6ea5ee6d-522d-42e8-b10d-9bd6632604fb",
            template_variables: {
                "name": name
            },
            subject: "Welcome to our platform",
            html: `<h1>Welcome, ${name}!</h1><p>Thank you for joining our platform.</p>`,
            category: "Welcome Email",
        })

        console.log("Welcome email sent successfully", response);
    } catch (error) {
        
    }
}