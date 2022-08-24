import React, { ChangeEvent, FC, memo, useEffect, useRef, useState } from 'react'
import { ReturnComponentType } from 'types'
import style from './DoubleRange.module.scss'
import { DoubleRangePropsType } from './types'

export const DoubleRange: FC<DoubleRangePropsType> =
	memo(({ min, max, minDefaultValue, maxDefaultValue, onSetMinAndMaxValueMouseUp, isDisabled }): ReturnComponentType => {

		const [minValue, setMinValue] = useState(min)
		const [maxValue, setMaxValue] = useState(max)

		const rangeRef = useRef<HTMLDivElement>(null)

		const onMinValueChange = (event: ChangeEvent<HTMLInputElement>): void => {
			const currentValue = Math.min(Number(event.currentTarget.value), maxValue)
			setMinValue(currentValue)
		}

		const onMaxValueChange = (event: ChangeEvent<HTMLInputElement>): void => {
			const currentValue = Math.max(Number(event.currentTarget.value), minValue)
			setMaxValue(currentValue)
		}

		useEffect(() => {
			setMinValue(minDefaultValue)
			setMaxValue(maxDefaultValue)
		}, [minDefaultValue, maxDefaultValue])

		return (
			<div className={style.container}>
				<input
					type='range'
					min={minDefaultValue}
					max={maxDefaultValue}
					value={minValue}
					onChange={onMinValueChange}
					className={`${style.thumb} ${style.thumbLeft}`}
					onMouseUp={() => onSetMinAndMaxValueMouseUp({ min: minValue, max: maxValue })}
					disabled={isDisabled}
				/>
				<input
					type='range'
					min={minDefaultValue}
					max={maxDefaultValue}
					value={maxValue}
					onChange={onMaxValueChange}
					className={`${style.thumb} ${style.thumbRight}`}
					onMouseUp={() => onSetMinAndMaxValueMouseUp({ min: minValue, max: maxValue })}
					disabled={isDisabled}
				/>

				<div className={style.slider}>
					<div className={style.track}></div>
					<div ref={rangeRef} className={style.range}></div>
					<div className={style.leftValue}>{minValue}</div>
					<div className={style.rightValue}>{maxValue}</div>
				</div>
			</div>
		)
	})