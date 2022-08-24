import { ChangeEvent, ReactNode } from 'react'

export type UniversalCheckboxPropsType = {
	setValue?: (checked: boolean) => void
	primary?: boolean
	secondary?: boolean
	additionalPrimaryCheckbox?: string
	additionalSecondaryCheckbox?: string
	labelClassName?: string
	spanClassName?: string
	onChange?: (event: ChangeEvent<HTMLInputElement>) => void
	children: ReactNode
	className?: string
	checked?: boolean
}
