import { IsNumber, IsString } from 'class-validator'

export class CommentDTO {
	@IsString()
	message: string

	@IsNumber()
	videoId: number
}
