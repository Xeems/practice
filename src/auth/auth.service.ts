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

  async login(user: User) {
    const payload = {
      sub: user.user_id,
      roles: [user.roles],
      username: `${user.family_name} ${user.first_name} ${user.middle_name}`
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
