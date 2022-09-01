import React, { FC } from 'react'

interface IFooterForm {
	isUploaded: boolean
	percent: number
}

const FooterForm: FC<IFooterForm> = ({ percent, isUploaded }) => {
	return <div>FooterForm</div>
}

export default FooterForm
