import React, { ChangeEvent, FC, useState } from 'react'
import { ReturnComponentType } from 'types'
import { useAppDispatch } from 'store/hooks'
import { removeCard, updateCard } from 'store/asyncActions/cards'
import { useSelector } from 'react-redux'
import { selectAuthorizedUserData } from 'store/selectors'
import { Actions } from 'components/common/actions'
import { convertDate } from 'utils'
import { Modal, ModalCard, ModalDelete } from 'components/common'
import style from './Card.module.scss'
import { EMPTY_STRING } from 'constants/base'

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

		const [isCardModalActive, setIsCardModalActive] = useState(false)
		const [isDeleteModalActive, setIsDeleteModalActive] = useState(false)
		const [questionValue, setQuestionValue] = useState(EMPTY_STRING)
		const [answerValue, setAnswerValue] = useState(EMPTY_STRING)

		const isOwner = authorizedUserData?._id === user_id

		const resetModalValues = (): void => {
			setIsCardModalActive(false)
			setQuestionValue(EMPTY_STRING)
			setAnswerValue(EMPTY_STRING)
		}

		const handleRemoveCardClick = (): void => {
			dispatch(removeCard({ packId, cardId }))
			setIsDeleteModalActive(false)
		}

		const handleUpdateCardQuestionClick = (): void => {
			dispatch(updateCard({ packId, cardId, question: questionValue, answer: answerValue }))
			resetModalValues()
		}

		const handleQuestionChange = (event: ChangeEvent<HTMLInputElement>): void => {
			setQuestionValue(event.currentTarget.value)
		}

		const handleAnswerChange = (event: ChangeEvent<HTMLInputElement>): void => {
			setAnswerValue(event.currentTarget.value)
		}

		const handleDeactivateCardModalClick = (): void => resetModalValues()

		const handleDeactivateDeleteModalClick = (): void => setIsDeleteModalActive(false)

		const handleActivateCardModalClick = (): void => setIsCardModalActive(true)

		const handleActivateDeleteModalClick = (): void => setIsDeleteModalActive(true)

		return (
			<>
				<Modal isModalActive={isCardModalActive} onDeactivateModalClick={handleDeactivateCardModalClick}>
					<ModalCard
						answer={answerValue}
						question={questionValue}
						onAnswerChange={handleAnswerChange}
						onQuestionChange={handleQuestionChange}
						onDeactivateModalClick={handleDeactivateCardModalClick}
						onSaveClick={handleUpdateCardQuestionClick}
						title={'Edit card'}
					/>
				</Modal>

				<Modal isModalActive={isDeleteModalActive} onDeactivateModalClick={handleDeactivateDeleteModalClick}>
					<ModalDelete
						title={'Delete Card'}
						name={question}
						onDeactivateModalClick={handleDeactivateDeleteModalClick}
						onDeleteClick={handleRemoveCardClick}
					/>
				</Modal>
				<div className={style.container}>
					<div className={style.list}>
						<div className={style.question}>{question}</div>
						<div className={style.answer}>{answer}</div>
						<div className={style.updated}>{convertDate(updated)}</div>
						<div className={style.grade}>{grade}</div>
						<div className={isOwner ? style.actions : style.secondaryActions}>
							{isOwner &&
								<Actions
									isDisabled={isDisabled}
									onActivateDeleteModalClick={handleActivateDeleteModalClick}
									onActivateEditModalClick={handleActivateCardModalClick}
								/>}
						</div>
					</div>
				</div>
			</>
		)
	}