import React, { FC } from 'react'
import { ReturnComponentType } from 'types'
import style from './Pack.module.scss'

type PackPropsType = {
	_id: string
	name: string
	cardsCount: number
	updated: Date
	user_name: string
}

export const Pack: FC<PackPropsType> = ({ _id, name, cardsCount, updated, user_name }): ReturnComponentType => {
	return (
		<div className={style.pack}>
			<div className={style.list}>
				<div className={style.name}>{name}</div>
				<div className={style.cardsCount}>{cardsCount}</div>
				<div className={style.updated}>{updated.toString()}</div>
				<div className={style.userName}>{user_name}</div>
				<div className={style.actions}>
					<button>Delete</button>
					<button>Edit</button>
					<button>Learn</button>
				</div>
			</div>
		</div>
	)
}
