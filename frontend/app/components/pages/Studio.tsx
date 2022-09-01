import React, { FC } from 'react'

import { api } from '@/store/api/api'
import { videoApi } from '@/store/api/video.api'

import Layout from '../layout/Layout'
import Loader from '../ui/loader/Loader'

import Catalog from './home/catalog/Catalog'

const Studio: FC = () => {
	const { data, isLoading } = api.useGetProfileQuery(null)
	const [removeVideo] = videoApi.useDeleteVideoMutation()

	const videos = data?.videos

	return (
		<Layout title='Rutube 2.0 Studio'>
			<div>
				{isLoading ? (
					<Loader count={5} />
				) : videos?.length ? (
					<Catalog
						newVideos={videos}
						removeHandler={removeVideo}
						isUpdateLink
					/>
				) : (
					<p>Видео не найдено!</p>
				)}
			</div>
		</Layout>
	)
}

export default Studio
