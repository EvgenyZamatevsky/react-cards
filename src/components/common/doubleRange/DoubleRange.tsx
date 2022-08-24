import React, { ChangeEvent, FC, memo, useEffect, useRef, useState } from 'react'
import { ReturnComponentType } from 'types'
import { DoubleRangePropsType } from './types'
import style from './DoubleRange.module.scss'

export const DoubleRange: FC<DoubleRangePropsType> =
	memo(({
		min,
		max,
		minDefaultValue,
		maxDefaultValue,
		setMinValueMouseUp,
		setMaxValueMouseUp,
		isDisabled
	}): ReturnComponentType => {

		const [minValue, setMinValue] = useState(min)
		const [maxValue, setMaxValue] = useState(max)

		const rangeRef = useRef<HTMLDivElement>(null)

		useEffect(() => {
			setMinValue(minDefaultValue)
			setMaxValue(maxDefaultValue)
		}, [minDefaultValue, maxDefaultValue])

		const onMinValueChange = (event: ChangeEvent<HTMLInputElement>): void => {
			const currentValue = Math.min(Number(event.currentTarget.value), maxValue)
			setMinValue(currentValue)
		}

		const onMaxValueChange = (event: ChangeEvent<HTMLInputElement>): void => {
			const currentValue = Math.max(Number(event.currentTarget.value), minValue)
			setMaxValue(currentValue)
		}

		const onMinValueMouseUp = (): void => {
			setMinValueMouseUp && setMinValueMouseUp(minValue)
		}

		const onMaxValueMouseUp = (): void => {
			setMaxValueMouseUp && setMaxValueMouseUp(maxValue)
		}

		return (
			<div className={style.container}>
				<input
					type='range'
					min={minDefaultValue}
					max={maxDefaultValue}
					value={minValue}
					onChange={onMinValueChange}
					className={`${style.thumb} ${style.thumbLeft}`}
					onMouseUp={onMinValueMouseUp}
					disabled={isDisabled}
				/>
				<input
					type='range'
					min={minDefaultValue}
					max={maxDefaultValue}
					value={maxValue}
					onChange={onMaxValueChange}
					className={`${style.thumb} ${style.thumbRight}`}
					onMouseUp={onMaxValueMouseUp}
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