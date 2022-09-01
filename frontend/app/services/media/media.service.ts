import axios from 'axios'

import { IMediaResponse } from './media.interface'

export const MediaService = {
	async upload(
		media: FormData,
		folder?: string,
		setValue?: (val: number) => void
	) {
		return axios.post<IMediaResponse>('/media', media, {
			params: { folder },
			headers: {
				'Content-Type': 'multipart/form-data'
			},
			onUploadProgress: progressEvet => {
				if (setValue) {
					const progress = (progressEvet.loaded / progressEvet.total) * 100
					setValue(Math.ceil(progress))
				}
			}
		})
	}
}
