import {
	BadRequestException,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { genSalt, hash } from 'bcryptjs'
import { Repository } from 'typeorm'
import { SubscriptionEntity } from './subscription.entity'
import { UserDTO } from './user.dto'
import { UserEntity } from './user.entity'

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(UserEntity)
		private readonly userRepository: Repository<UserEntity>,
		@InjectRepository(SubscriptionEntity)
		private readonly subscriptionRepository: Repository<SubscriptionEntity>
	) {}

	async byId(id: number) {
		const user = await this.userRepository.findOne({
			where: {
				id
			},
			relations: {
				videos: true,
				subscriptions: {
					toChannel: true
				}
			},
			order: {
				createdAt: 'DESC'
			}
		})

		if (!user) throw new NotFoundException('user не найден')

		return user
	}

	async updateProfile(id: number, dto: UserDTO) {
		const user = await this.byId(id)

		const isSameUser = await this.userRepository.findOneBy({ email: dto.email })
		if (isSameUser && id !== isSameUser.id)
			throw new BadRequestException('Email занят')

		if (dto.password) {
			const salt = await genSalt(10)
			user.password = await hash(dto.password, salt)
		}

		user.email = dto.email
		user.name = dto.name
		user.description = dto.description
		user.avatarPath = dto.avatarPath

		return this.userRepository.save(user)
	}

	async subscribe(userId: number, channelId: number) {
		const data = {
			toChannel: { id: channelId },
			fromUser: { id: userId }
		}
		const isSubscribed = await this.subscriptionRepository.findOneBy(data)
		const user = await this.byId(channelId)
		if (!isSubscribed) {
			const newSubscription = this.subscriptionRepository.create(data)
			user.subscribersCount = user.subscribersCount + 1
			await this.userRepository.save(user)
			await this.subscriptionRepository.save(newSubscription)
			return true
		}
		user.subscribersCount = user.subscribersCount - 1
		await this.userRepository.save(user)
		await this.subscriptionRepository.delete(data)
		return false
	}

	async getAll() {
		return this.userRepository.find()
	}
}
