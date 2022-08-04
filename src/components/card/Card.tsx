import { Search } from 'components/common/search'
import React, { FC } from 'react'
import { ReturnComponentType } from 'types'
import cart from 'assets/icons/cart.svg'
import pencil from 'assets/icons/pencil.svg'
import style from './Card.module.scss'

type CardPropsType = {
	question: string
	answer: string
	updated: Date
	grade: number
	cardsPack_id: string
}

export const Card: FC<CardPropsType> = ({ question, answer, updated, grade, cardsPack_id }): ReturnComponentType => {

	const isOwner = true // временная заглушка

	return (
		<div className={style.container}>
			<div className={style.list}>
				<div className={style.question}>{question}</div>
				<div className={style.answer}>{answer}</div>
				<div className={style.updated}>{updated.toString()}</div>
				<div className={style.grade}>{grade}</div>
				<div className={isOwner ? style.actions : style.secondaryActions}>
					{isOwner &&
						<>
							<button onClick={() => { }}>
								<img src={cart} alt='cart' />
							</button>
							<button onClick={() => { }}>
								<img src={pencil} alt='pencil' />
							</button>
						</>}
				</div>
			</div>
		</div>
	)
}
