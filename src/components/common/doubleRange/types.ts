export type DoubleRangePropsType = {
	min: number
	max: number
	minDefaultValue: number
	maxDefaultValue: number
	setMinValueMouseUp?: (min: number) => void
	setMaxValueMouseUp?: (max: number) => void
	isDisabled?: boolean
}