import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Header, SetMetadata } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LocalAuthGuard } from 'src/auth/guard/local.guard';
import { ApiBearerAuth, ApiHeader } from '@nestjs/swagger';
import { UserRole } from './entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { HasRole } from 'src/auth/decorator/hasRole.decorator';
import { RolesGuard } from 'src/auth/guard/role.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('newUser')
  @HasRole([UserRole.ADMIN])
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Get('findAll')
  @HasRole([UserRole.ADMIN])
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  findAll() {
    return this.usersService.findAll();
  }

}
