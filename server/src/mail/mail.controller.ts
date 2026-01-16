import {
  Body,
  Controller,
  Post,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { MailService } from './mail.service';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

class ContactMailDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  message: string;
}

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('contact')
  async sendContactMail(@Body() body: ContactMailDto) {
    const { name, email, message } = body;
    const to = process.env.CONTACT_EMAIL || 'contact@fanzone.example';
    const mailText = `Name: ${name}\nEmail: ${email}\nMessage: ${message}`;
    const mailHtml = `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong><br/>${message}</p>`;
    try {
      await this.mailService.sendMail(to, 'Contact Us', mailText, mailHtml);
      return { message: 'Your message has been sent successfully.' };
    } catch (err) {
      throw new HttpException(
        'Failed to send message.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
