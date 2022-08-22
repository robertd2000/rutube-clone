import cn from 'classnames'
import { useRouter } from 'next/router'
import React, { FC } from 'react'

import Layout from '@/components/layout/Layout'

import { IVideo } from '@/types/video.interface'

import { videoApi } from '@/store/api/video.api'

import styles from './Video.module.scss'
import VideoPlayer from './video-player/VideoPlayer'

const Video: FC = () => {
	const { query } = useRouter()

	const { data: video = {} as IVideo } = videoApi.useGetVideoByIdQuery(
		+query?.id!,
		{
			skip: !query.id
		}
	)

	return (
		<Layout title={video.name}>
			<div className={styles.layout}>
				<VideoPlayer videoPath={video.videoPath} />
				<div></div>
			</div>
			<div className={cn(styles.layout, 'mt-7')}></div>
		</Layout>
	)
}

export default Video
