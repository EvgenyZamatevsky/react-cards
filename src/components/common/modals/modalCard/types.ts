import { ChangeEvent, Ref } from 'react'

export type ModalCardPropsType = {
	question: string
	answer: string
	onQuestionChange: (event: ChangeEvent<HTMLInputElement>) => void
	onAnswerChange: (event: ChangeEvent<HTMLInputElement>) => void
	onDeactivateModalClick: () => void
	onSaveClick: () => void
	title: string
	ref: Ref<HTMLInputElement>
}
