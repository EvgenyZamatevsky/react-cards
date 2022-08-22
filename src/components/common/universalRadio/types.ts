import { DetailedHTMLProps, InputHTMLAttributes } from 'react'

type DefaultRadioPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export type UniversalRadioPropsType = Omit<DefaultRadioPropsType, 'type'> & {
	options: string[]
	setValue?: (option: string) => void
	setIndex?: (index: number) => void
}
