import { PackType } from 'api/packs/types'
import React, { FC } from 'react'
import { ReturnComponentType } from 'types'
import style from './Pack.module.scss'

export type PackPropsType = {
	pack: PackType
}

export const Pack: FC<PackPropsType> = ({ pack }): ReturnComponentType => {
	return (
		<div className={style.pack}>
			<div className={style.packName}>{pack.name}</div>
			<div className={style.packCards}>{pack.cardsCount}</div>
			<div className={style.packLastUpdated}>{pack.updated}</div>
			<div className={style.packCreatedBy}>{pack.user_name}</div>
			<div className={style.packActions}>
				<button className={style.delete}>Delete</button>
				<button className={style.edit}>Edit</button>
				<button className={style.learn}>Learn</button>
			</div>
		</div>
	)
}
