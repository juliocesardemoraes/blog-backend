import { AuthController } from './controllers/auth.controllers';
import { UserController } from './controllers/user.controllers';
import { DatabaseModule } from './database/database.module';
import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth.module';
import { UsersModule } from './modules/users.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [AuthModule, UsersModule, DatabaseModule, ConfigModule.forRoot()],
  controllers: [UserController, AuthController],
})
export class AppModule {}
