import React, { ChangeEvent, FC } from 'react'
import { ReturnComponentType } from 'types'
import { UniversalSelectPropsType } from './types'
import style from './UniversalSelect.module.scss'

export const UniversalSelect: FC<UniversalSelectPropsType> =
	({
		className,
		optionClassName,
		onChange,
		options,
		setValue,
		primary,
		secondary,
		additionalPrimarySelect,
		additionalSecondarySelect,
		...restProps
	}): ReturnComponentType => {

		const primarySelect = primary && `${style.primarySelect} ${additionalPrimarySelect && additionalPrimarySelect}`
		const secondarySelect = secondary && `${style.secondarySelect} ${additionalSecondarySelect && additionalSecondarySelect}`
		const otherSelect = className && className

		const primaryOption = `${style.primaryOption}`
		const otherOption = optionClassName && optionClassName

		const optionsRender: any[] = options
			? options.map((option, index) => <option className={`${primaryOption} ${otherOption}`} key={index}>{option}</option>)
			: []

		const onSelectChange = (event: ChangeEvent<HTMLSelectElement>): void => {
			onChange && onChange(event)
			setValue && setValue(event.currentTarget.value)
		}

		return (
			<select
				className={`${primarySelect} ${secondarySelect} ${otherSelect}`}
				onChange={onSelectChange}
				{...restProps}
			>
				{optionsRender}
			</select>
		)
	}
