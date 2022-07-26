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
		<div>
			{name}
		</div>
	)
}
