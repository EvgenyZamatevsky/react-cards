export type DoubleRangePropsType = {
	min: number
	max: number
	minDefaultValue: number
	maxDefaultValue: number
	onSetMinAndMaxValueMouseUp: ({ min, max }: { min: number, max: number }) => void
}