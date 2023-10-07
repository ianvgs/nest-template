//@Node Modules
import { MiddlewareConsumer, Module, NestModule, RequestMethod, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
//@Models(entities)
import { User } from './entities/user.entity';
//@Controllers
import { UserController } from './controllers/user.controller';
//@Services
import { UserService } from './services/user.service';
//@UseCases
import { UcCadastrarUser } from './useCases/UcCadastrarUser';
/* import { ConfigService } from '@nestjs/config'; */
import { ProjectNameMiddleware } from './middlewares/project-name.middleware';
import { PaymentService } from './services/payment.service';
/* import { APP_INTERCEPTOR } from '@nestjs/core'; */

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [User],
      'user_connection'
    ),
  ],
  controllers: [UserController],
  providers: [

    { provide: 'PAYMENT_SERVICE', useClass: PaymentService },
    UcCadastrarUser,
    UserService,
  ],
})
export class UserModule /* implements NestModule */ {
  /*   configure(consumer: MiddlewareConsumer) {
      consumer
        .apply
        ()
        .exclude()
        .forRoutes();
    } */
}
