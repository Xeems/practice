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
    const payload = { login: user.login, sub: user.user_id };
		return {
			user_id: user.user_id,
			family_name: user.family_name,
      first_name: user.first_name,
      middle_name: user.middle_name,
			login: user.login,
			access_token: this.jwtService.sign(payload),
		};
  }
}
