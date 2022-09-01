import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { IMediaResponse } from 'services/media/media.interface'

import { IVideoDto } from '@/types/video.interface'

import { videoApi } from '@/store/api/video.api'

interface IUseUploadVideoForm {
	videoId: number
	handleCloseModal: () => void
}

export const useUploadVideoForm = ({
	videoId,
	handleCloseModal
}: IUseUploadVideoForm) => {
	const {
		register,
		formState: { errors },
		control,
		handleSubmit,
		watch,
		setValue,
		reset
	} = useForm<IVideoDto>({
		mode: 'onChange'
	})

	const [updateVideo, { isSuccess }] = videoApi.useUpdateVideoMutation()

	const onSubmit: SubmitHandler<IVideoDto> = data => {
		updateVideo({ ...data, id: videoId })
			.unwrap()
			.then(() => {
				handleCloseModal()
				reset()
			})
	}

	const videoPath = watch('videoPath')
	const thumbnailPath = watch('thumbnailPath')

	const [videoFileName, setVideoFileName] = useState<string>('')

	const handleUploadVideo = (value: IMediaResponse) => {
		setValue('videoPath', value.url)
		setValue('name', value.name)
		setVideoFileName(value.name)
	}

	const [isChosen, setIsChosen] = useState<boolean>(false)

	const [percent, setPercent] = useState<number>(0)
	const [isUploaded, setIsUploaded] = useState<boolean>(false)

	const setProgressPercentage = (val: number) => {
		setPercent(val)
		if (val === 100) setIsUploaded(true)
	}

	return {
		form: {
			register,
			errors,
			control,
			handleSubmit,
			onSubmit
		},
		status: {
			percent,
			isUploaded,
			isSuccess,
			isChosen
		},
		media: {
			videoFileName,
			thumbnailPath
		}
	}
}
