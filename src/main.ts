import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
// import { CurrentUser } from './users/interceptors';
// import { UsersService } from './users/users.service';

const cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieSession({
    keys: ["kM6*mkQy?ExD(?^oeWZr(mK3glShee??`t/$}OsTm6iI&U\X`oST\QESt_1h6D="]
  }))
  app.useGlobalPipes(new ValidationPipe({whitelist: true}));
  await app.listen(3000);
}
bootstrap();
