import { DetailedHTMLProps, InputHTMLAttributes, Ref } from 'react'

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export type UniversalInputPropsType = DefaultInputPropsType & {
	setValue?: (value: string) => void
	onEnter?: () => void
	onEscape?: () => void
	errorMessage?: string
	setErrorMessage?: (errorMessage: string) => void
	primary?: boolean
	secondary?: boolean
	additionalPrimaryInput?: string
	additionalSecondaryInput?: string

	ref?: Ref<HTMLInputElement>
}
