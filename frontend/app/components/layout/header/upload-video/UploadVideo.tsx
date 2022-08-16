import React, { useState } from 'react'
import { HiUpload } from 'react-icons/hi'

import { videoApi } from '@/store/api/video.api'

import stylesIcon from '../icons-right/IconsRight.module.scss'

const UploadVideo = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const [videoId, setVideoId] = useState<number>(0)

	const [createVideo, { isLoading }] = videoApi.useCreateVideoMutation()

	return (
		<>
			<button
				className={stylesIcon.button}
				disabled={isLoading}
				onClick={() =>
					createVideo()
						.unwrap()
						.then(id => {
							setVideoId(+id)
							setIsOpen(true)
						})
				}
			>
				<HiUpload />
			</button>
		</>
	)
}

export default UploadVideo
