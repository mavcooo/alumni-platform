import nodemailer from 'nodemailer';
import { logger } from '../config/logger';

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

const transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export const sendEmail = async (options: EmailOptions): Promise<void> => {
  try {
    const mailOptions = {
      from: `${process.env.FROM_NAME || 'Alumni Platform'} <${process.env.FROM_EMAIL || process.env.SMTP_USER}>`,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text || options.html.replace(/<[^>]*>/g, ''),
    };
    
    await transporter.sendMail(mailOptions);
    logger.info('Email sent successfully', { to: options.to, subject: options.subject });
  } catch (error) {
    logger.error('Failed to send email', { error, to: options.to });
    throw error;
  }
};

export const sendWelcomeEmail = async (email: string, name: string, verificationUrl: string): Promise<void> => {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #333;">Benvenuto su Alumni Platform!</h1>
      <p>Ciao ${name},</p>
      <p>Grazie per esserti registrato sulla piattaforma Alumni. Per completare la registrazione, verifica il tuo indirizzo email cliccando sul pulsante qui sotto:</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${verificationUrl}" style="background-color: #007bff; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">Verifica Email</a>
      </div>
      <p>Oppure copia e incolla questo link nel tuo browser:</p>
      <p style="color: #666; word-break: break-all;">${verificationUrl}</p>
      <p>Se non hai richiesto questa registrazione, ignora questa email.</p>
      <hr style="border: 1px solid #eee; margin: 30px 0;" />
      <p style="color: #999; font-size: 12px;">Alumni Platform - Connettere studenti e professionisti</p>
    </div>
  `;
  
  await sendEmail({
    to: email,
    subject: 'Verifica il tuo account Alumni Platform',
    html,
  });
};

export const sendPasswordResetEmail = async (email: string, resetUrl: string): Promise<void> => {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #333;">Reset Password</h1>
      <p>Hai richiesto il reset della tua password. Clicca sul pulsante qui sotto per procedere:</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${resetUrl}" style="background-color: #dc3545; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">Reset Password</a>
      </div>
      <p>Oppure copia e incolla questo link nel tuo browser:</p>
      <p style="color: #666; word-break: break-all;">${resetUrl}</p>
      <p><strong>Questo link è valido per 1 ora.</strong></p>
      <p>Se non hai richiesto il reset, ignora questa email e la tua password rimarrà invariata.</p>
      <hr style="border: 1px solid #eee; margin: 30px 0;" />
      <p style="color: #999; font-size: 12px;">Alumni Platform</p>
    </div>
  `;
  
  await sendEmail({
    to: email,
    subject: 'Reset Password - Alumni Platform',
    html,
  });
};
