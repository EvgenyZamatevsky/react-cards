import { ChangeEvent } from 'react'

export type UniversalSelectPropsType = {
	options: string[]
	setValue?: (value: string) => void
	optionClassName?: string
	primary?: boolean
	secondary?: boolean
	additionalPrimarySelect?: boolean
	additionalSecondarySelect?: boolean
	className?: string
	onChange?: (event: ChangeEvent<HTMLSelectElement>) => void
	value: number
	disabled?: boolean
}
