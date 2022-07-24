import { Search } from 'components/search'
import React, { FC } from 'react'
import { ReturnComponentType } from 'types'
import style from './PacksList.module.scss'

type PacksListPropsType = {

}

export const PacksList: FC<PacksListPropsType> = (): ReturnComponentType => {
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
