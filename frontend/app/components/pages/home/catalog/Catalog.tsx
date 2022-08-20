import React, { FC } from 'react'

import Heading from '@/components/ui/heading/Heading'
import VideoItem from '@/components/ui/video-item/VideoItem'

import { IVideo } from '@/types/video.interface'

import styles from './Catalog.module.scss'

type Props = {}

interface ICatalog {
	newVideos: IVideo[]
	removeHandler?: (videoId: number) => void
	isUpdateLink?: boolean
}

const Catalog: FC<ICatalog> = ({ newVideos, isUpdateLink, removeHandler }) => {
	return (
		<div className={styles.recommended}>
			<div className={styles.top_block}>
				<Heading title={removeHandler ? 'Мои видео' : 'Рекоммендации'} />
			</div>

			<div className={styles.catalog}>
				{newVideos?.map(video => (
					<VideoItem
						item={video}
						key={video.id}
						removehandler={removeHandler}
						isUpdateLink={isUpdateLink}
					/>
				))}
			</div>
		</div>
	)
}

export default Catalog
