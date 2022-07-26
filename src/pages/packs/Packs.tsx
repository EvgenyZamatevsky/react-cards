import { NavBar, Search } from 'components'
import { Pack } from 'components/pack'
import { Path } from 'enums'
import React, { FC, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { getPacks } from 'store/asyncActions/packs'
import { useAppDispatch } from 'store/hooks'
import { selectIsAuth, selectPacks } from 'store/selectors'
import { ReturnComponentType } from 'types'
import style from './Packs.module.scss'

type PacksPropsType = {

}

export const Packs: FC<PacksPropsType> = (): ReturnComponentType => {

	const dispatch = useAppDispatch()

	const isAuth = useSelector(selectIsAuth)
	const packs = useSelector(selectPacks)

	const packsRender = packs.map(({ _id, name, cardsCount, updated, user_name }) => {
		return <Pack key={_id} _id={_id} name={name} cardsCount={cardsCount} updated={updated} user_name={user_name} />
	})

	useEffect(() => {
		if (isAuth) {
			dispatch(getPacks())
		}
	}, [])

	if (!isAuth) {
		return <Navigate to={Path.LOGIN} />
	}

	return (
		<div className={style.packs}>
			<div className={style.body}>
				<NavBar />
				<div className={style.packsList}>
					<h2 className={style.title}>Packs list</h2>
					<div className={style.content}>
						<Search />
						<button className={style.addNewPackBtn}>Add new Pack</button>
					</div>
					{packsRender}
				</div>
			</div>
		</div>
	)
}
