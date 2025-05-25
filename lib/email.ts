import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendEmailProps {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: SendEmailProps) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Core Analytics <no-reply@core-analytics.com>',
      to,
      subject,
      html,
    });

    if (error) {
      console.error('Error sending email:', error);
      return { error };
    }

    return { data };
  } catch (error) {
    console.error('Error sending email:', error);
    return { error };
  }
}

export function getPaymentConfirmationEmail(email: string, planName: string, price: number, billingCycle: string) {
  const subject = 'Payment Confirmation - Core Analytics';
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #1a56db;">Payment Confirmed!</h1>
      <p>Thank you for subscribing to Core Analytics. Your payment has been processed successfully.</p>
      
      <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h2 style="color: #374151; margin-top: 0;">Payment Details</h2>
        <p><strong>Plan:</strong> ${planName}</p>
        <p><strong>Price:</strong> $${price.toFixed(2)}/${billingCycle}</p>
        <p><strong>Email:</strong> ${email}</p>
      </div>

      <p>Please check your email for a verification link to complete your account setup.</p>
      
      <p>If you have any questions, please don't hesitate to contact our support team.</p>
      
      <p style="color: #6b7280; font-size: 14px; margin-top: 40px;">
        Best regards,<br>
        The Core Analytics Team
      </p>
    </div>
  `;

  return { subject, html };
}

export function getVerificationEmail(email: string, verificationLink: string) {
  const subject = 'Verify Your Email - Core Analytics';
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #1a56db;">Verify Your Email</h1>
      <p>Thank you for signing up for Core Analytics. Please verify your email address to complete your account setup.</p>
      
      <div style="text-align: center; margin: 40px 0;">
        <a href="${verificationLink}" style="background-color: #1a56db; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
          Verify Email Address
        </a>
      </div>
      
      <p>If you didn't create an account with Core Analytics, you can safely ignore this email.</p>
      
      <p style="color: #6b7280; font-size: 14px; margin-top: 40px;">
        Best regards,<br>
        The Core Analytics Team
      </p>
    </div>
  `;

  return { subject, html };
}
