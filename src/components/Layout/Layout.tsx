import { Header } from 'components/Header'
import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { ReturnComponentType } from 'types'

export type LayoutPropsType = {

}

export const Layout: FC<LayoutPropsType> = (): ReturnComponentType => {
	return (
		<div>
			<Header />
			<Outlet />
		</div>
	)
}
