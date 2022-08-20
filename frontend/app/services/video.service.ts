import { axiosClassic } from 'api/axios'

import { IUser } from '@/types/user.interface'
import { IVideo } from '@/types/video.interface'

export const VIDEO = 'video'

export const VideoService = {
	async getAll() {
		return axiosClassic.get<IVideo[]>(`/${VIDEO}`)
	},
	async getMostPopular() {
		return axiosClassic.get<IVideo[]>(`/${VIDEO}/most-popular`)
	}
}
