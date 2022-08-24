import React, { ChangeEvent, FC } from 'react'
import { ReturnComponentType } from 'types'
import { UniversalRadioPropsType } from './types'
import style from './UniversalRadio.module.scss'

export const UniversalRadio: FC<UniversalRadioPropsType> =
	({
		options,
		name,
		value,
		setValue,
		setIndex,
		onChange,
		primary,
		secondary,
		additionalPrimaryRadio,
		additionalSecondaryRadio,
		className,
		labelClassName,
		...restProps
	}): ReturnComponentType => {

		const primaryRadio = primary && `${style.primaryRadio} ${additionalPrimaryRadio && additionalPrimaryRadio}`
		const secondaryRadio = secondary && `${style.secondaryRadio} ${additionalSecondaryRadio && additionalSecondaryRadio}`
		const otherRadio = className && className

		const primaryLabel = `${style.primaryLabel}`
		const otherLabel = labelClassName && labelClassName

		const optionsRender = options.map((option, index) => {
			const onRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
				onChange && onChange(event)
				setValue && setValue(event.currentTarget.value)
				setIndex && setIndex(index)
			}

			return (
				<label key={index} className={`${primaryLabel} ${otherLabel}`}>
					<input
						className={`${primaryRadio} ${secondaryRadio} ${otherRadio}`}
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

		return (
			<>{optionsRender}</>
		)
	}
