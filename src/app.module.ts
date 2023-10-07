import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './UserModule/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataSourceOptions } from 'typeorm';
import DatabasesConfig from './config/databases.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: false,
      load: [DatabasesConfig],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      //O nome que eu vou chamar dentro da aplicação
      name: 'user_connection',
      useFactory: async (configService: ConfigService) => {
        //O nome que eu registrei em /config
        return configService.get<DataSourceOptions>('database.user');
      },
    }),
    UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
/*   configure(consumer: MiddlewareConsumer) {
    consumer.apply(ValidationPipe).forRoutes('*');
  } */
}
