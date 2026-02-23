import { Injectable } from '@nestjs/common';
import { Resend } from 'resend';

@Injectable()
export class MailService {
  private resend: Resend;

  constructor() {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error(
        'RESEND_API_KEY is required. Get one at https://resend.com/api-keys',
      );
    }
    this.resend = new Resend(apiKey);
  }

  private getFrom(): string {
    const email =
      process.env.EMAIL_FROM || process.env.EMAIL_USER || 'onboarding@resend.dev';
    return `"Fan Zone" <${email}>`;
  }

  async sendMail(to: string, subject: string, text: string, html?: string) {
    const from = this.getFrom();

    try {
      const { data, error } = await this.resend.emails.send({
        from,
        to,
        subject,
        text,
        html: html ?? undefined,
      });
      if (error) throw new Error(error.message);
      console.log(`Email sent to ${to}: ${data?.id ?? 'ok'}`);
    } catch (err) {
      console.error(`Error sending email to ${to}:`, err);
      throw err;
    }
  }
}
