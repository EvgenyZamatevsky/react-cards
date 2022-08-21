import { DetailedHTMLProps, InputHTMLAttributes } from 'react'

type DefaultRadioPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export type UniversalRadioPropsType = Omit<DefaultRadioPropsType, 'type'> & {
	options?: any[]
	setValue?: (option: any) => void
	setIndex?: (index: any) => void
}
