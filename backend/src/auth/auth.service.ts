import {
	BadRequestException,
	Injectable,
	NotFoundException,
	UnauthorizedException
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { UserEntity } from 'src/user/user.entity'
import { Repository } from 'typeorm'
import { AuthDTO } from './auth.dto'
import { compare, genSalt, hash } from 'bcryptjs'

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(UserEntity)
		private readonly userRepository: Repository<UserEntity>,
		private readonly jwtService: JwtService
	) {}

	async login(dto: AuthDTO) {
		const user = await this.validateUser(dto)

		return {
			user: this.returnUserFields(user),
			accessToken: await this.issueAccessToken(user.id)
		}
	}

	async register(dto: AuthDTO) {
		const oldUser = await this.userRepository.findOneBy({ email: dto.email })
		if (oldUser) throw new BadRequestException('Email занят')

		const salt = await genSalt(10)
		const newUser = await this.userRepository.create({
			email: dto.email,
			password: await hash(dto.password, salt)
		})

		const user = await this.userRepository.save(newUser)

		return {
			user: this.returnUserFields(user),
			accessToken: await this.issueAccessToken(user.id)
		}
	}

	async validateUser(dto: AuthDTO) {
		const user = await this.userRepository.findOne({
			where: {
				email: dto.email
			},
			select: ['id', 'email', 'password']
		})

		if (!user) throw new NotFoundException('Пользователь не найден!')

		const isValidPassword = await compare(dto.password, user.password)

		if (!isValidPassword)
			throw new UnauthorizedException('Неправильный пароль!')

		return user
	}

	async issueAccessToken(userId: number) {
		const data = {
			id: userId
		}

		return await this.jwtService.signAsync(data, {
			expiresIn: '31d'
		})
	}

	returnUserFields(user: UserEntity) {
		return {
			id: user.id,
			email: user.email
		}
	}
}
