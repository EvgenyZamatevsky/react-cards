import React, { ChangeEvent, FC, useRef, useState } from 'react'
import { ReturnComponentType } from 'types'
import { useAppDispatch } from 'hooks'
import { removeCard, updateCardQuestionOrAnswer } from 'store/asyncActions/cards'
import { Actions } from 'components/common/actions'
import { convertDate } from 'utils'
import { Modal, ModalCard, ModalDelete } from 'components/common'
import { EMPTY_STRING } from 'constants/base'
import { CardPropsType } from './types'
import style from './Card.module.scss'

export const Card: FC<CardPropsType> =
	({ cardId, question, answer, updated, grade, packId, isOwner }): ReturnComponentType => {

		const dispatch = useAppDispatch()

		const [isCardModalActive, setIsCardModalActive] = useState(false)
		const [isDeleteModalActive, setIsDeleteModalActive] = useState(false)
		const [questionValue, setQuestionValue] = useState(EMPTY_STRING)
		const [answerValue, setAnswerValue] = useState(EMPTY_STRING)

		const editableQuestionInputRef = useRef<HTMLInputElement>(null)

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
				dispatch(updateCardQuestionOrAnswer({ packId, cardId, domainPayload: { answer: answerValue, question: questionValue } }))
			}

			setIsCardModalActive(false)
		}

		const handleDeactivateCardModalClick = (): void => resetModalValues()

		const handleDeactivateDeleteModalClick = (): void => setIsDeleteModalActive(false)

		const handleActivateCardModalClick = (): void => {
			setIsCardModalActive(true)
			setQuestionValue(question)
			setAnswerValue(answer)
			editableQuestionInputRef.current?.focus()
		}

		const handleActivateDeleteModalClick = (): void => setIsDeleteModalActive(true)

		return (
			<>
				<Modal isModalActive={isCardModalActive} onDeactivateModalClick={handleDeactivateCardModalClick}>
					<ModalCard
						answer={answerValue}
						question={questionValue}
						setAnswerValue={setAnswerValue}
						setQuestionValue={setQuestionValue}
						onDeactivateModalClick={handleDeactivateCardModalClick}
						onSaveClick={handleUpdateCardQuestionClick}
						ref={editableQuestionInputRef}
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
