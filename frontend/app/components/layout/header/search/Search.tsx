import React, { FC } from 'react'

import styles from './Search.module.scss'
import { useSearch } from './useSearch'

const Search: FC = () => {
	const { data, handleSearch, isSuccess, searchTerm } = useSearch()

	return (
		<div className={styles['search-top']}>
			<label>
				<input
					type='text'
					placeholder='Поиск видео...'
					value={searchTerm}
					onChange={handleSearch}
				/>

				<img
					src='https://www.inventicons.com/uploads/iconset/1174/wm/512/Instrument-loop-magnifier-scale-search-svg-76.png'
					alt=''
				/>
			</label>
			{isSuccess && (
				<div className={styles.result}>
					{data?.length ? (
						data.map(video => <div key={video.id}>{video.name}</div>)
					) : (
						// data.map(video => <VideoItem isSmall item={video} key={video.id} />)
						<div className='text-white'>Видео не найдены!</div>
					)}
				</div>
			)}
		</div>
	)
}

export default Search
