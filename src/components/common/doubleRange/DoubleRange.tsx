import React, { ChangeEvent, FC, memo, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectIsDisabled } from 'store/selectors'
import { ReturnComponentType } from 'types'
import style from './DoubleRange.module.scss'
import { DoubleRangePropsType } from './types'

export const DoubleRange: FC<DoubleRangePropsType> =
	memo(({ min, max, minDefaultValue, maxDefaultValue, onSetMinAndMaxValueMouseUp }): ReturnComponentType => {
		const isDisabled = useSelector(selectIsDisabled)

		const [minValue, setMinVal] = useState(min)
		const [maxValue, setMaxVal] = useState(max)

		const rangeRef = useRef<HTMLDivElement>(null)

		const onMinValueChange = (event: ChangeEvent<HTMLInputElement>): void => {
			const currentValue = Math.min(Number(event.currentTarget.value), maxValue)
			setMinVal(currentValue)
		}

		const onMaxValueChange = (event: ChangeEvent<HTMLInputElement>): void => {
			const currentValue = Math.max(Number(event.currentTarget.value), minValue)
			setMaxVal(currentValue)
		}

		useEffect(() => {
			setMinVal(minDefaultValue)
			setMaxVal(maxDefaultValue)
		}, [minDefaultValue, maxDefaultValue])

		return (
			<div>
				<div className={style.numberOfCards}>Number of cards</div>
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
			</div>
		)
	})