import { Search } from 'components/common/search'
import React, { FC } from 'react'
import { ReturnComponentType } from 'types'
import cart from 'assets/icons/cart.svg'
import pencil from 'assets/icons/pencil.svg'
import style from './Card.module.scss'
import { useAppDispatch } from 'store/hooks'
import { removeCard, updateCardQuestion } from 'store/asyncActions/cards'

type CardPropsType = {
	question: string
	answer: string
	updated: Date
	grade: number
	cardId: string
	packId: string
}

export const Card: FC<CardPropsType> = ({ cardId, question, answer, updated, grade, packId }): ReturnComponentType => {

	const dispatch = useAppDispatch()

	const isOwner = true // временная заглушка

	const onRemoveCardClick = (): void => {
		dispatch(removeCard({ packId, cardId }))
	}

	const onUpdateCardQuestionClick = (): void => {
		dispatch(updateCardQuestion({ packId, cardId, question: 'test' }))
	}
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
							<button onClick={onRemoveCardClick}>
								<img src={cart} alt='cart' />
							</button>
							<button onClick={onUpdateCardQuestionClick}>
								<img src={pencil} alt='pencil' />
							</button>
						</>}
				</div>
			</div>
		</div>
	)
}
