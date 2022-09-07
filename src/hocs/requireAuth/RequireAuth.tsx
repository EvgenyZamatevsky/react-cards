import React, { FC } from 'react'
import { Path } from 'enums'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'
import { selectIsAuth } from 'store/selectors'
import { ReturnComponentType } from 'types'
import { RequireAuthPropsType } from './types'

export const RequireAuth: FC<RequireAuthPropsType> = ({ children }): ReturnComponentType => {

	const location = useLocation()

	const isAuth = useSelector(selectIsAuth)

	if (!isAuth) {
		return <Navigate to={Path.LOGIN} state={{ from: location }} />
	}

	return <>{children}</>
}
