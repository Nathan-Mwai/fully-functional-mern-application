import { sendEmail } from './mailtrap.config.js'; // Using the updated SendGrid client
import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE, WELCOME_EMAIL_TEMPLATE } from './emailTemplates.js';

export const sendVerificationEmail = async (email, verificationToken) => {
  const recipient = [{ email }];

  try {
    const response = await sendEmail({
      to: recipient[0].email,
      subject: 'Email Verification',
      html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
    });

    console.log("Email sent successfully", response);
  } catch (error) {
    console.error(`Failed to send verification email: ${error.message}`);
    throw new Error(`Failed to send verification email: ${error.message}`);
  }
};

export const sendWelcomeEmail = async (email, name) => {
  const recipient = [{ email }];
  
  try {
    const response = await sendEmail({
      to: recipient[0].email,
      subject: 'Welcome!',
      html: WELCOME_EMAIL_TEMPLATE.replace("{name}", name),  // Modify as per your template
    });

    console.log("Welcome email sent successfully", response);
  } catch (error) {
    console.error(`Failed to send welcome email: ${error.message}`);
    throw new Error(`Failed to send welcome email: ${error.message}`);
  }
};

export const sendPasswordResetEmail = async (email, resetURL) => {
  const recipient = [{ email }];
  
  try {
    const response = await sendEmail({
      to: recipient[0].email,
      subject: 'Password Reset Request',
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
    });
    
    console.log("Password reset email sent successfully", response);
  } catch (error) {
    console.error(`Failed to send password reset email: ${error.message}`);
    throw new Error(`Failed to send password reset email: ${error.message}`);
  }
};

export const sendResetSuccessEmail = async (email) => {
  const recipient = [{ email }];
  
  try {
    const response = await sendEmail({
      to: recipient[0].email,
      subject: 'Password Reset Successful',
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
    });

    console.log("Password reset success email sent successfully", response);
  } catch (error) {
    console.error(`Failed to send password reset success email: ${error.message}`);
    throw new Error(`Failed to send password reset success email: ${error.message}`);
  }
};
