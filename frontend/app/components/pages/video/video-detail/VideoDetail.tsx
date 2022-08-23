import React, { FC } from 'react'
import { IoMdEye } from 'react-icons/io'
import { RiHeart2Fill } from 'react-icons/ri'

import ChannelInfoSmall from '@/components/ui/channel-indo-small/ChannelInfoSmall'
import LikeButton from '@/components/ui/like-button/LikeButton'
import SubscribeButton from '@/components/ui/subscribe-button/SubscribeButton'

import { IUser } from '@/types/user.interface'
import { IVideo } from '@/types/video.interface'

import { videoApi } from '@/store/api/video.api'

import { formatNumberToK } from '@/utils/format-number.utils'

import styles from './VideoDetail.module.scss'

const VideoDetail: FC<{ video: IVideo; channel: IUser }> = ({
	video,
	channel
}) => {
	return (
		<div className={styles.detail}>
			<div>
				<ChannelInfoSmall channel={channel} />
				<h1>{video.name}</h1>
				<article className={styles.article}>{video.description}</article>
			</div>
			<div className='pt-2'>
				<div className={styles.wrapper_button}>
					{video.user?.id && (
						<SubscribeButton channelIdForSubscribe={video.user.id} />
					)}
					<LikeButton video={video} />
				</div>

				<div className={styles.number_info}>
					<div>
						<IoMdEye />
						<span>{formatNumberToK(video?.views || 0)} views</span>
					</div>

					<div>
						<RiHeart2Fill />
						<span>{formatNumberToK(video?.likes || 0)} likes</span>
					</div>
				</div>
			</div>
		</div>
	)
}

export default VideoDetail
