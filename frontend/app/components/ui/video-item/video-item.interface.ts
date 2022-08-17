import { IVideo } from '@/types/video.interface'

export interface IVideoItem {
	item: IVideo
	removehandler?: (videoId: number) => void
	isUpdateLink?: boolean
	isSmall?: boolean
}
