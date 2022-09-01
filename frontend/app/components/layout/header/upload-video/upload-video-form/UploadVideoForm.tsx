import React, { FC } from 'react'
import { Controller } from 'react-hook-form'
import { IMediaResponse } from 'services/media/media.interface'

import Field from '@/components/ui/field/Field'
import TextArea from '@/components/ui/text-area/TextArea'
import UploadField from '@/components/ui/upload-field/UploadField'

import SuccessMessage from './SuccessMessage'
import styles from './UploadVideo.module.scss'
import FooterForm from './footer-form/FooterForm'
import TogglePublic from './toggle-public/TogglePublic'
import { useUploadVideoForm } from './useUploadVideoForm'
import VideoInformation from './video-information/VideoInformation'

const UploadVideoForm: FC<{
	videoId: number
	handleCloseModal: () => void
}> = ({ videoId, handleCloseModal }) => {
	const { form, status, media } = useUploadVideoForm({
		videoId,
		handleCloseModal
	})

	return (
		<form
			onSubmit={form.handleSubmit(form.onSubmit)}
			className='flex flex-wrap'
		>
			{status.isSuccess && <SuccessMessage />}
			{status.isChosen ? (
				<>
					<div className='w-7/12 pr-6 pt-3'>
						<Field
							{...form.register('name', {
								required: 'Название обязательно!'
							})}
							placeholder='Name'
							error={form.errors.name}
						/>

						<TextArea
							{...form.register('description', {
								required: 'Описание обязательно!'
							})}
							placeholder='Description'
							error={form.errors.description}
						/>

						<div className='mt-8'>
							<Controller
								control={form.control}
								name='thumbnailPath'
								render={({ field: { onChange } }) => (
									<UploadField
										folder='thumbnail'
										onChange={(value: IMediaResponse) => onChange(value.url)}
									/>
								)}
							/>
						</div>

						<Controller
							control={form.control}
							name='isPublic'
							render={({ field: { onChange, value } }) => (
								<TogglePublic
									clickHandler={() => onChange(!value)}
									isEnabled={!!value}
								/>
							)}
						/>
					</div>
					<div className='w-5/12 p-3 pl-10'>
						<VideoInformation
							fileName={media.videoFileName}
							videoId={videoId}
							isUploaded={status.isUploaded}
							thumbnailPath={media.thumbnailPath}
						/>
					</div>

					<FooterForm isUploaded={status.isUploaded} percent={status.percent} />
				</>
			) : (
				''
			)}
		</form>
	)
}

export default UploadVideoForm
