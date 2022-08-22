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
		...restProps
	}): ReturnComponentType => {

		const primaryCheckbox = primary && `${style.primaryCheckbox} ${additionalPrimaryCheckbox && additionalPrimaryCheckbox}`
		const secondaryCheckbox = secondary && `${style.secondaryCheckbox} ${additionalSecondaryCheckbox && additionalSecondaryCheckbox}`
		const otherCheckbox = className && className

		const onCheckboxChange = (event: ChangeEvent<HTMLInputElement>): void => {
			onChange && onChange(event)
			setValue && setValue(event.currentTarget.checked)
		}

		return (
			<label className={style.label}>
				<input
					type='checkbox'
					onChange={onCheckboxChange}
					className={`${primaryCheckbox} ${secondaryCheckbox} ${otherCheckbox}`}
					{...restProps}
				/>
				{children && <span className={style.spanClassName}>{children}</span>}
			</label>
		)
	}
