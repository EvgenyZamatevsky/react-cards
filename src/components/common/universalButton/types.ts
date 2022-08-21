import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

export type UniversalButtonPropsType = DefaultButtonPropsType & {
	primary?: boolean
	secondary?: boolean
	additionalPrimaryBtn?: string
	additionalSecondaryBtn?: string
}
