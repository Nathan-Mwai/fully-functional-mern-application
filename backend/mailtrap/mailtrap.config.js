import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';

dotenv.config();

// Set SendGrid API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sender = {
  email: 'nathan.mwai@student.moringaschool.com', // Your sender email
  name: 'Nathan', // Your sender name
};

export const sendEmail = async ({ to, subject, html, from, text }) => {
  try {
    const msg = {
      to, // Recipient's email
      from: from || sender.email, // Sender email (use default if not provided)
      subject,
      html, // HTML content
      text, // Optional plain-text content (fallback)
    };

    const response = await sgMail.send(msg);
    console.log('Email sent successfully:', response);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
};

// 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