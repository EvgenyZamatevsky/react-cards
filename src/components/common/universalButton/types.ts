import { ReactNode } from 'react'

export type UniversalButtonPropsType = {
	primary?: boolean
	secondary?: boolean
	additionalPrimaryBtn?: string
	additionalSecondaryBtn?: string
	className?: string
	children: ReactNode
	onClick?: () => void
	disabled?: boolean
	type?: 'button' | 'submit' | 'reset'
}
