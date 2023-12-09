import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt/dist';
import { LocalStrategy } from './strategy/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { LocalAuthGuard } from './guard/local.guard';
import { JwtStrategy } from './strategy/jwt.strategy';
import { RolesGuard } from './guard/role.guard';

@Module({
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, LocalAuthGuard, RolesGuard, UsersModule],
  imports:[UsersModule, PassportModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1200d' },
    }),]
})
export class AuthModule {}
