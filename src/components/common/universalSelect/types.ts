import { DetailedHTMLProps, SelectHTMLAttributes } from 'react'

type DefaultSelectPropsType = DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>

export type UniversalSelectPropsType = DefaultSelectPropsType & {
	options: string[]
	setValue?: (value: string) => void
}
