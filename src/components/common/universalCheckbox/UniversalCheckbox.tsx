import React, { ChangeEvent, FC } from 'react'
import { ReturnComponentType } from 'types'
import { UniversalCheckboxPropsType } from './types'
import style from './UniversalCheckbox.module.scss'

export const UniversalCheckbox: FC<UniversalCheckboxPropsType> =
	({
		onChange,
		setValue,
		children,
		className,
		primary,
		secondary,
		additionalPrimaryCheckbox,
		additionalSecondaryCheckbox,
		labelClassName,
		spanClassName,
		...restProps
	}): ReturnComponentType => {

		const primaryCheckbox = primary && `${style.primaryCheckbox} ${additionalPrimaryCheckbox && additionalPrimaryCheckbox}`
		const secondaryCheckbox = secondary && `${style.secondaryCheckbox} ${additionalSecondaryCheckbox && additionalSecondaryCheckbox}`
		const otherCheckbox = className && className
		const primaryLabel = `${style.primaryLabel}`
		const otherLabel = labelClassName && labelClassName
		const primarySpan = `${style.primarySpan}`
		const otherSpan = spanClassName && spanClassName

		const onCheckboxChange = (event: ChangeEvent<HTMLInputElement>): void => {
			onChange && onChange(event)
			setValue && setValue(event.currentTarget.checked)
		}

		return (
			<label className={`${primaryLabel} ${otherLabel}`}>
				<input
					type='checkbox'
					onChange={onCheckboxChange}
					className={`${primaryCheckbox} ${secondaryCheckbox} ${otherCheckbox}`}
					{...restProps}
				/>
				{children && <span className={`${primarySpan} ${otherSpan}`}>{children}</span>}
			</label>
		)
	}
