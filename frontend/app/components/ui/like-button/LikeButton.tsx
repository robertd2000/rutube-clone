import cn from 'classnames'
import React, { FC, useState } from 'react'
import { RiHeart2Fill } from 'react-icons/ri'

import { IVideo } from '@/types/video.interface'

import { videoApi } from '@/store/api/video.api'

import styles from './LikeButton.module.scss'

const LikeButton: FC<{ video: IVideo }> = ({ video }) => {
	const [isLiked, setisLiked] = useState<boolean>(false)
	const [updateLike, { isLoading: isLikeLoading }] =
		videoApi.useUpdateLikesMutation()

	const likeHandler = () => {
		if (isLiked) {
			updateLike({ id: video.id, value: -1 })
			setisLiked(false)
		} else {
			updateLike({ id: video.id, value: 1 })
			setisLiked(true)
		}
	}

	return (
		<button
			className={cn(styles.likeButton, {
				[styles.active]: isLiked
			})}
			disabled={isLikeLoading}
			onClick={likeHandler}
		>
			<RiHeart2Fill /> Лайк
		</button>
	)
}

export default LikeButton
