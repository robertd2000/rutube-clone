import { IsEmail, IsString, MinLength } from 'class-validator'

export class AuthDTO {
	@IsEmail()
	email: string

	@MinLength(6, {
		message: 'не менее 6 символов'
	})
	@IsString()
	password: string
}
