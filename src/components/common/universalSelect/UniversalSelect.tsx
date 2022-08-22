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
		primarySelect,
		secondarySelect,
		additionalPrimarySelect,
		additionalSecondarySelect,
		...restProps
	}): ReturnComponentType => {

		const primarySelectClass = primarySelect && `${style.primarySelect} ${additionalPrimarySelect && additionalPrimarySelect}`
		const secondarySelectClass = secondarySelect && `${style.secondarySelect} ${additionalSecondarySelect && additionalSecondarySelect}`
		const otherSelectClass = className && className

		const optionClass = `${style.primaryOption}`
		const otherOptionClass = optionClassName && optionClassName

		const optionsRender: any[] = options
			? options.map((option, index) => {
				return <option className={`${optionClass} ${otherOptionClass}`} key={index}>{option}</option>
			})
			: []

		const onSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
			onChange && onChange(event)
			setValue && setValue(event.currentTarget.value)
		}

		return (
			<select
				className={`${primarySelectClass} ${secondarySelectClass} ${otherSelectClass}`}
				onChange={onSelectChange}
				{...restProps}>
				{optionsRender}
			</select>
		)
	}
