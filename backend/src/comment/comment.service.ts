import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CommentDTO } from './comment.dto'
import { CommentEntity } from './comment.entity'

@Injectable()
export class CommentService {
	constructor(
		@InjectRepository(CommentEntity)
		private readonly commentRepository: Repository<CommentEntity>
	) {}

	async create(userId: number, dto: CommentDTO) {
		const newComment = this.commentRepository.create({
			message: dto.message,
			video: { id: dto.videoId },
			user: {
				id: userId
			}
		})

		return this.commentRepository.save(newComment)
	}
}
