import { ChangeEvent, Ref } from 'react'

export type ModalCardPropsType = {
	question: string
	answer: string
	setQuestionValue: (questionValue: string) => void
	setAnswerValue: (answerValue: string) => void
	onDeactivateModalClick: () => void
	onSaveClick: () => void
	title: string
	ref: Ref<HTMLInputElement>
}
