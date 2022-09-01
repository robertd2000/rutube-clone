import React, { FC } from 'react'

import { IUploadField } from './UploadField.interface'
import { useUploadFile } from './useUploadFile'
import styles from './useUploadFile.module.scss'

const UploadField: FC<IUploadField> = ({
	title,
	onChange,
	folder,
	setValue,
	setisChosen
}) => {
	const { uploadFile } = useUploadFile(onChange, folder, setValue, setisChosen)

	return (
		<div className={styles.file}>
			{title && <h1>{title}</h1>}
			<label>
				<span className='sr-only'>Выберите файл</span>
				<input type='file' onChange={uploadFile} />
			</label>
		</div>
	)
}

export default UploadField
