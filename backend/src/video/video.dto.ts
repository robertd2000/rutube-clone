import { IsString } from 'class-validator'

export class VideoDTO {
	isPublic?: boolean

	@IsString()
	name: string

	@IsString()
	description: string

	@IsString()
	videoPath: string

	@IsString()
	thumbNailPath: string
}
