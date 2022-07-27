import React, { ChangeEvent, FC, useEffect, useRef, useState } from 'react'
import { ReturnComponentType } from 'types'
import style from './DoubleRange.module.scss'

export type maxMinValueType = {
	min: number
	max: number
}

type DoubleRangePropsType = {
	min: number
	max: number
	minDefault: number
	maxDefault: number
	disabled?: boolean
	onSetMinAndMaxValueMouseUp: ({ min, max }: maxMinValueType) => void
	changeSlider?: boolean
}

export const DoubleRange: FC<DoubleRangePropsType> = React.memo(({ min, max, minDefault, maxDefault, disabled, onSetMinAndMaxValueMouseUp, changeSlider }): ReturnComponentType => {
	const [minVal, setMinVal] = useState(min);
	const [maxVal, setMaxVal] = useState(max);
	const range = useRef<HTMLDivElement>(null);

	useEffect(() => {
		setMinVal(minDefault)
		setMaxVal(maxDefault)
	}, [minDefault, maxDefault, changeSlider])

	return (
		<div className={style.container}>
			<input
				type='range'
				min={minDefault}
				max={maxDefault}
				value={minVal}
				onChange={(event: ChangeEvent<HTMLInputElement>) => {
					const value = Math.min(Number(event.target.value), maxVal);
					setMinVal(value);
				}}
				className={`${style.thumb} ${style.thumbLeft}`}
				onMouseUp={() => onSetMinAndMaxValueMouseUp({ min: minVal, max: maxVal })}
				disabled={disabled}
			/>
			<input
				type='range'
				min={minDefault}
				max={maxDefault}
				value={maxVal}
				onChange={(event: ChangeEvent<HTMLInputElement>) => {
					const value = Math.max(Number(event.target.value), minVal);
					setMaxVal(value);
				}}
				className={`${style.thumb} ${style.thumbRight}`}
				onMouseUp={() => onSetMinAndMaxValueMouseUp({ min: minVal, max: maxVal })}
				disabled={disabled}
			/>

			<div className={style.slider}>
				<div className={style.slider__track}></div>
				<div ref={range} className={style.slider__range}></div>
				<div className={style.slider__leftValue}>{minVal}</div>
				<div className={style.slider__rightValue}>{maxVal}</div>
			</div>
		</div>
	)
})