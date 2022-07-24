import { CardType } from 'api/cards'
import React, { FC, memo } from 'react'
import { ReturnComponentType } from 'types'
import style from './Card.module.scss'

export type CardPropsType = {
	card: CardType
}

export const Card: FC<CardPropsType> = memo(({ card }): ReturnComponentType => {
	return (
		<div className={style.card}>
			<div className={style.packName}>{card.question}</div>
			<div className={style.packCards}>{card.answer}</div>
			<div className={style.packLastUpdated}>{card.updated}</div>
			<div className={style.packCreatedBy}>{card.grade}</div>
		</div>
	)
})
