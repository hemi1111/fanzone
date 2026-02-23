import { MailService } from './../mail/mail.service';
import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiKeyGuard } from 'src/auth/api-key/api-key.guard';
import { generateOrderHtml } from 'src/mail/order.html-template';

@Controller('orders')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly mailService: MailService,
  ) {}

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    try {
      const order = await this.ordersService.create(createOrderDto);
      const orderHtml = generateOrderHtml(order);
      const subject = `Konfirmim Porosie - #${order.id}`;

      try {
        await this.mailService.sendMail(
          order.user_email,
          subject,
          '',
          orderHtml,
        );
      } catch (customerEmailErr) {
        console.warn(
          `Could not send order confirmation to ${order.user_email} (order #${order.id}):`,
          customerEmailErr,
        );
      }

      // Always send notification to site owner
      const ownerEmail =
        process.env.CONTACT_EMAIL || process.env.EMAIL_USER || process.env.EMAIL_FROM;
      if (ownerEmail) {
        await this.mailService.sendMail(
          ownerEmail,
          `Porosi e re - #${order.id}`,
          '',
          orderHtml,
        );
      }

      return {
        message: 'Order created successfully and emails sent.',
        order,
      };
    } catch (err) {
      console.error('Error creating order:', err);
      throw new HttpException(
        'Failed to create order or send email.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(ApiKeyGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(+id, updateOrderDto);
  }

  @UseGuards(ApiKeyGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
}
