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
      // ✅ Send confirmation email to client
      await this.mailService.sendMail(
        order.user_email,
        `Konfirmim Porosie - #${order.id}`,
        '', // plain text version (optional)
        generateOrderHtml(order),
      );

      // ✅ Send notification email to yourself
      await this.mailService.sendMail(
        process.env.EMAIL_USER!,
        `Porosi e re - #${order.id}`,
        '',
        generateOrderHtml(order),
      );

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
