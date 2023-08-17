import { Controller, OnModuleInit, Inject } from '@nestjs/common';
import { Redis } from 'ioredis';
import { BookingService } from './booking.service';

@Controller('booking')
export class BookingController implements OnModuleInit {
  constructor(
    @Inject('REDIS_CLIENT') private readonly redis: Redis,
    private readonly bookingService: BookingService,
  ) {}

  //
  onModuleInit() {
    this.redis.subscribe('Ticket');
    this.redis.on('message', async (channel, message) => {
      const booking = JSON.parse(message);
      const createBooking = await this.bookingService.createBooking(booking);

      if ((createBooking.success = true)) console.log('공연 예매 성공!');
    });
  }
}
