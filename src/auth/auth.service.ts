import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService) { }

  async validateUser(login: string, pass: string) {
    const user = await this.usersService.findByLogin(login);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      sub: user.userId,
      roles: [user.roles],
      username: `${user.familyName} ${user.firstName} ${user.middleName}`
    };
    return {
      ...user,
      access_token: this.jwtService.sign(payload),
    };
  }
}
