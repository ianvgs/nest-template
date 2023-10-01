//@Node Modules
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
//@Models(entities)
import { User } from './entities/user.entity';
//@Controllers
import { UserController } from './controllers/user.controller';
//@Services
import { UserService } from './services/user.service';
//@UseCases
import { UcCadastrarUser } from './useCases/userUseCases/UcCadastrarUser';
/* import { ConfigService } from '@nestjs/config'; */
import { ProjectNameMiddleware } from './middlewares/project-name.middleware';
/* import { APP_INTERCEPTOR } from '@nestjs/core'; */

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [User,],
      'user_connection'
    ),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    UcCadastrarUser
  ],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply
      ()
      .exclude()
      .forRoutes();
  }
}
