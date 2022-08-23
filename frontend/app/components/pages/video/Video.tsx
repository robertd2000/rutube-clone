import cn from 'classnames'
import { useRouter } from 'next/router'
import React, { FC, useEffect } from 'react'
import { checkServerIdentity } from 'tls'

import Layout from '@/components/layout/Layout'

import { IUser } from '@/types/user.interface'
import { IVideo } from '@/types/video.interface'

import { videoApi } from '@/store/api/video.api'

import styles from './Video.module.scss'
import Comments from './comments/Comments'
import VideoDetail from './video-detail/VideoDetail'
import VideoPlayer from './video-player/VideoPlayer'

const Video: FC = () => {
	const { query } = useRouter()

	const { data: video = {} as IVideo } = videoApi.useGetVideoByIdQuery(
		+query?.id!,
		{
			skip: !query.id
		}
	)

	const [updateViews] = videoApi.useUpdateViewsMutation()

	useEffect(() => {
		if (query.id) updateViews(+query.id)
	}, [query.id])

	return (
		<Layout title={video.name}>
			<div className={styles.layout}>
				<VideoPlayer videoPath={video.videoPath} />
				<Comments comments={video.comments || []} videoId={video.id} />
			</div>
			<div className={cn(styles.layout, 'mt-7')}>
				<VideoDetail video={video} channel={video.user || ({} as IUser)} />
				<div></div>
			</div>
		</Layout>
	)
}

export default Video
