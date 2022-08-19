import React, { ChangeEvent, FC, useState } from 'react'
import { ReturnComponentType } from 'types'
import { useAppDispatch } from 'store/hooks'
import { removeCard, updateCard } from 'store/asyncActions/cards'
import { useSelector } from 'react-redux'
import { selectAuthorizedUserId } from 'store/selectors'
import { Actions } from 'components/common/actions'
import { convertDate } from 'utils'
import { Modal, ModalCard, ModalDelete } from 'components/common'
import { EMPTY_STRING } from 'constants/base'
import { CardPropsType } from './types'
import style from './Card.module.scss'

export const Card: FC<CardPropsType> =
	({ cardId, question, answer, updated, grade, packId, isDisabled, user_id }): ReturnComponentType => {

		const dispatch = useAppDispatch()

		const authorizedUserId = useSelector(selectAuthorizedUserId)

		const [isCardModalActive, setIsCardModalActive] = useState(false)
		const [isDeleteModalActive, setIsDeleteModalActive] = useState(false)
		const [questionValue, setQuestionValue] = useState(EMPTY_STRING)
		const [answerValue, setAnswerValue] = useState(EMPTY_STRING)

		const isOwner = authorizedUserId === user_id

		const resetModalValues = (): void => {
			setIsCardModalActive(false)

			if (answerValue !== answer) {
				setAnswerValue(answer)
			}

			if (questionValue !== question) {
				setQuestionValue(question)
			}
		}

		const handleRemoveCardClick = (): void => {
			dispatch(removeCard({ packId, cardId }))
			setIsDeleteModalActive(false)
		}

		const handleUpdateCardQuestionClick = (): void => {
			if (answerValue !== answer || questionValue !== question) {
				dispatch(updateCard({ packId, cardId, domainPayload: { answer: answerValue, question: questionValue } }))
			}

			setIsCardModalActive(false)
		}

		const handleQuestionChange = (event: ChangeEvent<HTMLInputElement>): void => {
			setQuestionValue(event.currentTarget.value)
		}

		const handleAnswerChange = (event: ChangeEvent<HTMLInputElement>): void => {
			setAnswerValue(event.currentTarget.value)
		}

		const handleDeactivateCardModalClick = (): void => resetModalValues()

		const handleDeactivateDeleteModalClick = (): void => setIsDeleteModalActive(false)

		const handleActivateCardModalClick = (): void => {
			setIsCardModalActive(true)
			setQuestionValue(question)
			setAnswerValue(answer)
		}

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
						isPackDelete={false}
					/>
				</Modal>
				<div className={style.container}>
					<div className={style.list}>
						<div className={style.question}>{question}</div>
						<div className={style.answer}>{answer}</div>
						<div className={style.updated}>{convertDate(updated)}</div>
						<div className={style.grade}>{Number(grade.toFixed(1))}</div>
						<div className={style.actionsContainer}>
							<Actions
								isDisabled={isDisabled}
								onActivateDeleteModalClick={handleActivateDeleteModalClick}
								onActivateEditModalClick={handleActivateCardModalClick}
								isTeacherVisible={false}
								isOwner={isOwner}
							/>
						</div>
					</div>
				</div>
			</>
		)
	}
