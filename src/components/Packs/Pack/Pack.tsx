import { PackType } from 'api/packs/types'
import { Path } from 'enums'
import { useTypedDispatch } from 'hooks'
import React, { FC } from 'react'
import { NavLink } from 'react-router-dom'
import { deletePackTC, updatePackTC } from 'store/packsReducer/thunks'
import { ReturnComponentType } from 'types'
import style from './Pack.module.scss'

export type PackPropsType = {
	pack: PackType
}

export const Pack: FC<PackPropsType> = ({ pack }): ReturnComponentType => {

	const dispatch = useTypedDispatch()

	const onDeletePackClick = (): void => {
		dispatch(deletePackTC(pack._id))
	}

	const onUpdatePackClick = () => {
		dispatch(updatePackTC({ cardsPack: { _id: pack._id, name: 'Pack' } }))
	}

	return (
		<div className={style.pack}>
			<NavLink to={`${Path.packs}/${pack._id}`} className={style.packName}>{pack.name}</NavLink>
			<div className={style.packCards}>{pack.cardsCount}</div>
			<div className={style.packLastUpdated}>{pack.updated}</div>
			<div className={style.packCreatedBy}>{pack.user_name}</div>
			<div className={style.packActions}>
				<button className={style.delete} onClick={onDeletePackClick}>Delete</button>
				<button className={style.edit} onClick={onUpdatePackClick}>Edit</button>
				<button className={style.learn}>Learn</button>
			</div>
		</div>
	)
}
