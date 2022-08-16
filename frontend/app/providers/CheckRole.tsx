import { useRouter } from 'next/router'
import React, { FC, PropsWithChildren } from 'react'

import { useAuth } from '../hooks/useAuth'
import { TypeComponentAuthFields } from '../providers/private-route.interface'

const CheckRole: FC<PropsWithChildren<TypeComponentAuthFields>> = ({
	children,
	Component: { isOnlyUser }
}) => {
	const { isLoading, user } = useAuth()
	const { replace, pathname } = useRouter()

	const Children = () => <>{children}</>

	if (isLoading) {
		return null
	}

	if (user) {
		return <Children />
	}

	if (isOnlyUser) {
		pathname !== '/' && replace('/')
	}
	return null
}

export default CheckRole
