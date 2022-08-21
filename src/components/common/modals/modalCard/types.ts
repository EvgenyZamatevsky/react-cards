import { ChangeEvent, Ref } from 'react'

export type ModalCardPropsType = {
	question: string
	answer: string
	questionErrorMessage: string
	answerErrorMessage: string
	setQuestionValue: (questionValue: string) => void
	setAnswerValue: (answerValue: string) => void
	onDeactivateModalClick: () => void
	onSaveClick: () => void
	setQuestionErrorMessage: (questionErrorMessage: string) => void
	setAnswerErrorMessage: (answerErrorMessage: string) => void
	title: string
	ref: Ref<HTMLInputElement>

}
