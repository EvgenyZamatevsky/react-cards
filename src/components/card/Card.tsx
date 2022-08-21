import React, { FC, useRef, useState } from 'react'
import { ReturnComponentType } from 'types'
import { useAppDispatch } from 'hooks'
import { removeCard, updateCardQuestionOrAnswer } from 'store/asyncActions/cards'
import { Actions } from 'components/common/actions'
import { convertDate } from 'utils'
import { Modal, ModalCard, ModalDelete } from 'components/common'
import { EMPTY_STRING, ERROR_MESSAGE } from 'constants/base'
import { CardPropsType } from './types'
import style from './Card.module.scss'

export const Card: FC<CardPropsType> =
	({ cardId, question, answer, updated, grade, packId, isOwner }): ReturnComponentType => {

		const dispatch = useAppDispatch()

		const [isCardModalActive, setIsCardModalActive] = useState(false)
		const [isDeleteModalActive, setIsDeleteModalActive] = useState(false)
		const [updatedQuestion, setUpdatedQuestion] = useState(EMPTY_STRING)
		const [updatedAnswer, setUpdatedAnswer] = useState(EMPTY_STRING)
		const [questionErrorMessage, setQuestionErrorMessage] = useState(EMPTY_STRING)
		const [answerErrorMessage, setAnswerErrorMessage] = useState(EMPTY_STRING)

		const editableQuestionInputRef = useRef<HTMLInputElement>(null)

		const resetModalValues = (): void => {
			setIsCardModalActive(false)
			setQuestionErrorMessage(EMPTY_STRING)
			setAnswerErrorMessage(EMPTY_STRING)

			if (updatedAnswer !== answer) {
				setUpdatedAnswer(answer)
			}

			if (updatedQuestion !== question) {
				setUpdatedQuestion(question)
			}
		}

		const handleRemoveCardClick = (): void => {
			dispatch(removeCard({ packId, cardId }))
			setIsDeleteModalActive(false)
		}

		const handleUpdateCardQuestionAndAnswerClick = (): void => {
			const updatedAnswerTrimmed = updatedAnswer.trim()
			const updatedQuestionTrimmed = updatedQuestion.trim()
			const answerTrimmed = answer.trim()
			const questionTrimmed = question.trim()

			if (updatedAnswerTrimmed !== EMPTY_STRING && updatedQuestionTrimmed !== EMPTY_STRING) {
				if (updatedAnswerTrimmed !== answerTrimmed || updatedQuestionTrimmed !== questionTrimmed) {
					dispatch(updateCardQuestionOrAnswer({ packId, cardId, domainPayload: { answer: updatedAnswerTrimmed, question: updatedQuestionTrimmed } }))
				}

				setIsCardModalActive(false)
			} else {
				if (updatedAnswerTrimmed === EMPTY_STRING) {
					setAnswerErrorMessage(ERROR_MESSAGE)
				}

				if (updatedQuestionTrimmed === EMPTY_STRING) {
					setQuestionErrorMessage(ERROR_MESSAGE)
				}
			}
		}

		const handleDeactivateCardModalClick = (): void => resetModalValues()

		const handleDeactivateDeleteModalClick = (): void => setIsDeleteModalActive(false)

		const handleActivateCardModalClick = (): void => {
			setIsCardModalActive(true)
			setUpdatedQuestion(question)
			setUpdatedAnswer(answer)
			editableQuestionInputRef.current?.focus()
		}

		const handleActivateDeleteModalClick = (): void => setIsDeleteModalActive(true)

		return (
			<>
				<Modal isModalActive={isCardModalActive} onDeactivateModalClick={handleDeactivateCardModalClick}>
					<ModalCard
						answer={updatedAnswer}
						question={updatedQuestion}
						setAnswerValue={setUpdatedAnswer}
						setQuestionValue={setUpdatedQuestion}
						onDeactivateModalClick={handleDeactivateCardModalClick}
						onSaveClick={handleUpdateCardQuestionAndAnswerClick}
						ref={editableQuestionInputRef}
						title={'Edit card'}
						questionErrorMessage={questionErrorMessage}
						setQuestionErrorMessage={setQuestionErrorMessage}
						setAnswerErrorMessage={setAnswerErrorMessage}
						answerErrorMessage={answerErrorMessage}
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
