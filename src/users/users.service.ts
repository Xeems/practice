import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
	constructor(private prisma: PrismaService) { }
	create(createUserDto: CreateUserDto) {
		const user = this.prisma.user.create({
			data: createUserDto
		})
		return user;
	}

	async findAll() {
		return await this.prisma.user.findMany()
	}

	async findByLogin(login: string): Promise<User | null> {
		const user: User = await this.prisma.user.findUnique({
			where: {
				login: login
			}
		})
		return user
	}

	update(id: number, updateUserDto: UpdateUserDto) {
		return `This action updates a #${id} user`;
	}

	remove(id: number) {
		return `This action removes a #${id} user`;
	}
}
