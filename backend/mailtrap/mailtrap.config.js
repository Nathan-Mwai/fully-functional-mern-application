import  { MailtrapClient } from "mailtrap";
import dotenv from 'dotenv';

dotenv.config()

const TOKEN = process.env.MAILTRAP_TOKEN
const ENDPOINT = process.env.MAILTRAP_ENDPOINT;

const client = new MailtrapClient({
  token: TOKEN,
});

const sender = {
    // This is the demo email
  email: "hello@demomailtrap.com",
  name: "Berry",
};
const recipients = [
  {
    email: "nathan.mwai@student.moringaschool.com",
  }
];

client
  .send({
    from: sender,
    to: recipients,
    subject: "You are awesome!",
    html: "Congrats for sending test email with Mailtrap!",
    category: "Integration Test",
  })
  .then(console.log, console.error);