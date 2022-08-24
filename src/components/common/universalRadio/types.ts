import { ChangeEvent } from "react"

export type UniversalRadioPropsType = {
	options: string[]
	setValue?: (option: string) => void
	setIndex?: (index: number) => void
	primary?: boolean
	secondary?: boolean
	additionalPrimaryRadio?: boolean
	additionalSecondaryRadio?: boolean
	labelClassName?: string
	name: string
	value: string
	onChange?: (event: ChangeEvent<HTMLInputElement>) => void
	className?: string
}
