import { Search } from 'components/search'
import React, { FC } from 'react'
import { ReturnComponentType } from 'types'
import style from './Card.module.scss'

type CardPropsType = {
	question: string
	answer: string
	updated: Date
	grade: number
}

export const Card: FC<CardPropsType> = ({ question, answer, updated, grade }): ReturnComponentType => {
	return (
		<div className={style.container}>
			{question}
		</div>
	)
}
