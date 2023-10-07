import {
    IsNotEmpty,
    IsEmail,
} from 'class-validator';



export class CreatePaymentDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    price: number;
}