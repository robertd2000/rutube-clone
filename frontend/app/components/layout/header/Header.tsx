import React, { FC } from 'react'

import styles from './Header.module.scss'
import IconsRigth from './icons-right/IconsRigth'
import Search from './profile-menu/Search'

const Header: FC = () => {
	return (
		<header className={styles.header}>
			<Search />
			<IconsRigth />
		</header>
	)
}

export default Header
