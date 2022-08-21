import React, { ChangeEvent, FC } from 'react'
import { ReturnComponentType } from 'types'
import { UniversalRadioPropsType } from './types'
import style from './UniversalRadio.module.scss'

export const UniversalRadio: FC<UniversalRadioPropsType> =
	({ options, name, value, setValue, onChange, ...restProps }): ReturnComponentType => {

		const onRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
			onChange && onChange(event)
			setValue && setValue(event.currentTarget.value)
		}

		const optionsRender: any[] = options
			? options.map((option, index) => {
				return (
					<label key={index} className={style.label}>
						<input
							className={''}
							type='radio'
							name={name}
							value={option}
							checked={option === value}
							onChange={onRadioChange}
							{...restProps}
						/>
						{option}
					</label>
				)
			})
			: []

		return (
			<>{optionsRender}</>
		)
	}
