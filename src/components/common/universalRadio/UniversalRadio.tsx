import React, { ChangeEvent, FC } from 'react'
import { ReturnComponentType } from 'types'
import { UniversalRadioPropsType } from './types'
import style from './UniversalRadio.module.scss'

export const UniversalRadio: FC<UniversalRadioPropsType> =
	({ options, name, value, setValue, setIndex, onChange, ...restProps }): ReturnComponentType => {

		const optionsRender: any[] = options
			? options.map((option, index) => {

				const onRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
					onChange && onChange(event)
					setValue && setValue(event.currentTarget.value)
					setIndex && setIndex(index)
				}

				return (
					<label key={index} className={style.label}>
						<input
							className={style.radio}
							type='radio'
							name={name}
							value={option}
							checked={option === value}
							onChange={onRadioChange}
							{...restProps}
						/>
						<div className={style.option}>{option}</div>
					</label>
				)
			})
			: []

		return (
			<>{optionsRender}</>
		)
	}
