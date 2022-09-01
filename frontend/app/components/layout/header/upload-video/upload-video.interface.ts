import { Dispatch, SetStateAction } from 'react'

export interface IUploadVideo {
	isOpen: boolean
	setIsOpen: Dispatch<SetStateAction<boolean>>
	videoId: number
}
