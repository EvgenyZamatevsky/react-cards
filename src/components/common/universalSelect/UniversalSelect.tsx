import React, { ChangeEvent, FC } from 'react'
import { ReturnComponentType } from 'types'
import { UniversalSelectPropsType } from './types'
import style from './UniversalSelect.module.scss'

export const UniversalSelect: FC<UniversalSelectPropsType> =
	({ className, onChange, options, setValue, ...restProps }): ReturnComponentType => {

		const optionsRender: any[] = options
			? options.map((option, index) => {
				return <option className={style.option} key={index}>{option}</option>
			})
			: []

		const onSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
			onChange && onChange(event)
			setValue && setValue(event.currentTarget.value)
		}

		const selectClassName = `${style.select} ${className && className}`

		return (
			<select className={selectClassName} onChange={onSelectChange} {...restProps}>
				{optionsRender}
			</select>
		)
	}
