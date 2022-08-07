import React, { FC } from 'react'
import { ReturnComponentType } from 'types'
import { useAppDispatch } from 'store/hooks'
import { removeCard, updateCardQuestion } from 'store/asyncActions/cards'
import { useSelector } from 'react-redux'
import { selectAuthorizedUserData } from 'store/selectors'
import { Actions } from 'components/common/actions'
import style from './Card.module.scss'

type CardPropsType = {
	question: string
	answer: string
	updated: Date
	grade: number
	cardId: string
	packId: string
	isDisabled: boolean
	user_id: string
}

export const Card: FC<CardPropsType> =
	({ cardId, question, answer, updated, grade, packId, isDisabled, user_id }): ReturnComponentType => {

		const dispatch = useAppDispatch()

		const authorizedUserData = useSelector(selectAuthorizedUserData)

		const isOwner = authorizedUserData?._id === user_id

		const handleRemoveCardClick = (): void => {
			dispatch(removeCard({ packId, cardId }))
		}

		const handleUpdateCardQuestionClick = (): void => {
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
							<Actions
								isDisabled={isDisabled}
								onRemoveItemClick={handleRemoveCardClick}
								onUpdateItemClick={handleUpdateCardQuestionClick}
							/>}
					</div>
				</div>
			</div>
		)
	}
