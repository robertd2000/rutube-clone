import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FaUserCircle } from 'react-icons/fa'

import { useAuth } from '@/hooks/useAuth'
import { useOutside } from '@/hooks/useOutside'

import stylesIcon from '../icons-right/IconsRigth.module.scss'

import styles from './AuthForm.module.scss'
import { IAuthFields } from './auth-form.interface'

const AuthForm = () => {
	const { ref, isShow, setIsShow } = useOutside(false)

	const [type, setType] = useState<'login' | 'register'>('login')

	// const {isLoading} = useAuth()

	const {
		register,
		formState: { errors },
		handleSubmit
	} = useForm<IAuthFields>({
		mode: 'onChange'
	})

	const onSubmit: SubmitHandler<IAuthFields> = data => {
		if (type === 'login') {
		} else if (type === 'register') {
		}
	}
	return (
		<div className={styles.wrapper} ref={ref}>
			<button className={stylesIcon.button} onClick={() => setIsShow(!isShow)}>
				<FaUserCircle fill='#A4A4A4' />
			</button>

			{isShow && (
				<form className={styles.form} onSubmit={handleSubmit(onSubmit)}></form>
			)}
		</div>
	)
}

export default AuthForm
