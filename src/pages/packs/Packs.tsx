import { NavBar, PacksList } from 'components'
import React, { FC, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getPacks } from 'store/asyncActions/packs'
import { useAppDispatch } from 'store/hooks'
import { selectIsAuth } from 'store/selectors'
import { ReturnComponentType } from 'types'
import style from './Packs.module.scss'

type PacksPropsType = {

}

export const Packs: FC<PacksPropsType> = (): ReturnComponentType => {
	console.log('f')
	const dispatch = useAppDispatch()

	const isAuth = useSelector(selectIsAuth)

	useEffect(() => {
		//dispatch(getPacks())
	}, [])

	return (
		<div className={style.packs}>
			<div className={style.body}>
				<NavBar />
				<div className={style.packsList}>
					<PacksList />
				</div>
			</div>
		</div>
	)
}
