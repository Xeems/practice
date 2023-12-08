import { Injectable, ConflictException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
	constructor(private prisma: PrismaService) { }
	async create(createUserDto: CreateUserDto) {
		const user = await this.findByLogin(createUserDto.login)
		console.log(user)
		if (!user) {
			const newUser = this.prisma.user.create({
				data: createUserDto
			})
			return newUser;
		}
		else
			return new ConflictException('user alredy exists')
	}

	async findAll() {
		return await this.prisma.user.findMany()
	}

	async findByLogin(login: string): Promise<any> {
		const user = await this.prisma.user.findUnique({
			where: {
				login: login
			}
		})
		return user
	}

	remove(id: number) {
		return `This action removes a #${id} user`;
	}
}
