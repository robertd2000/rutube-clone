import React, { FC } from 'react'

import { IComment } from '@/types/comment.interface'

import { useAuth } from '@/hooks/useAuth'

import AddComment from './AddComment'
import CommentItem from './CommentItem'
import styles from './Comments.module.scss'

const Comments: FC<{ comments: IComment[]; videoId: number }> = ({
	comments,
	videoId
}) => {
	const { user } = useAuth()

	return (
		<div className={styles.comments}>
			<h2>Комментарии</h2>
			<div className={styles.line} />
			{comments.length ? (
				<div className={styles.grid}>
					{comments.map(comment => (
						<CommentItem comment={comment} key={comment.id} />
					))}
				</div>
			) : (
				<p>Комментариев не найдено!</p>
			)}

			<div className={styles.bottomForm}>
				{user && <AddComment videoId={videoId} />}
			</div>
		</div>
	)
}

export default Comments
