import React, { FC } from 'react'

import ChannelInfoSmall from '@/components/ui/channel-indo-small/ChannelInfoSmall'

import { IComment } from '@/types/comment.interface'

import styles from './Comments.module.scss'

const CommentItem: FC<{ comment: IComment }> = ({ comment }) => {
	return (
		<div className={styles.commentItem}>
			<ChannelInfoSmall channel={comment.user} message={comment.message} />
		</div>
	)
}

export default CommentItem
