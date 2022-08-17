import { ReactNode } from 'react'

export type ModalPropsType = {
	children: ReactNode
	isModalActive: boolean
	onDeactivateModalClick: () => void
}
