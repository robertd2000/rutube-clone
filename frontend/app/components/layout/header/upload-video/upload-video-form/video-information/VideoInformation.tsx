import Image from 'next/image'
import Link from 'next/link'
import React, { FC } from 'react'

import styles from './VideoInformation.module.scss'

interface IVideoInformation {
	fileName: string
	videoId: number
	isUploaded: boolean
	thumbnailPath: string
}

const VideoInformation: FC<IVideoInformation> = ({
	fileName,
	isUploaded,
	thumbnailPath,
	videoId
}) => {
	return (
		<div className={styles.info}>
			{!thumbnailPath ? (
				<div className={styles.thumbnail}>
					{!isUploaded
						? 'Идет загрузка видео...'
						: 'Необходимо загрузить превью'}
				</div>
			) : (
				<Image
					src={thumbnailPath}
					width={344}
					height={190}
					alt=''
					layout='responsive'
				/>
			)}
			<div className={styles.details}>
				<div>
					<span>Video Link</span>
					<span>
						<Link href={`/v/${videoId}`}>
							<a>http://local/v/{videoId}</a>
						</Link>
					</span>
				</div>
				<div>
					<span>Filename</span>
					<span>{fileName}</span>
				</div>
			</div>
		</div>
	)
}

export default VideoInformation
