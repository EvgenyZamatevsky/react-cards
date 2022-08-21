import React, { FC } from 'react'
import { ReturnComponentType } from 'types'
import { UniversalButtonPropsType } from './types'
import style from './UniversalButton.module.scss'

export const UniversalButton: FC<UniversalButtonPropsType> =
	({ className, additionalPrimaryBtn, additionalSecondaryBtn, primary, secondary, ...restProps }): ReturnComponentType => {

		const primaryBtn = primary && `${style.primaryBtn} ${additionalPrimaryBtn && additionalPrimaryBtn}`
		const secondaryBtn = secondary && `${style.secondaryBtn} ${additionalSecondaryBtn && additionalSecondaryBtn}`
		const otherBtn = className && className

		return <button {...restProps} className={`${primaryBtn} ${secondaryBtn} ${otherBtn}`} />
	}
