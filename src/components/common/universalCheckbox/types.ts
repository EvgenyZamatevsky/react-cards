import { DetailedHTMLProps, InputHTMLAttributes } from 'react'

type DefaultCheckboxPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export type UniversalCheckboxPropsType = Omit<DefaultCheckboxPropsType, 'type'> & {
	setValue?: (checked: boolean) => void
	primary?: boolean
	secondary?: boolean
	additionalPrimaryCheckbox?: string
	additionalSecondaryCheckbox?: string
	labelClassName?: string
	spanClassName?: string
}
