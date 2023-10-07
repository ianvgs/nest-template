import { BadRequestException, Inject, Injectable, } from '@nestjs/common';
import { CreatePaymentDto } from '../dto/createPayment.dto';

@Injectable()
export class PaymentService {
  private users = [
    { email: "ianzito" }
  ]

  async createPayment(payment: CreatePaymentDto) {
    const { email } = payment;
    const userIsRegistered = this.users.find((el) => el.email == email)

    if (userIsRegistered) {
      return {
        id: 1,
        status: 'success'
      }
    } else {
      throw new BadRequestException()
    }

  }




}
