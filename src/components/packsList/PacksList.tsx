import { Search } from 'components/search'
import React, { FC, useEffect } from 'react'
import { getPacks } from 'store/asyncActions/packs'
import { useAppDispatch } from 'store/hooks'
import { ReturnComponentType } from 'types'
import style from './PacksList.module.scss'

type PacksListPropsType = {

}

export const PacksList: FC<PacksListPropsType> = (): ReturnComponentType => {

	const dispatch = useAppDispatch()

	return (
		<>
			<h2 className={style.title}>Packs list</h2>
			<div className={style.body}>
				<Search />
				<button className={style.addNewPackBtn}>Add new Pack</button>
			</div>
		</>
	)
}
