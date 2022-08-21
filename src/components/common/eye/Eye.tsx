import React, { FC } from 'react'
import { ReturnComponentType } from 'types'
import { EyePropsType } from './types'
import openEye from 'assets/icons/openEye.svg'
import closedEye from 'assets/icons/closedEye.svg'
import style from './Eye.module.scss'

export const Eye: FC<EyePropsType> = ({ typePassword, setTypePassword }): ReturnComponentType => {

	const onShowOpenEyeClick = (): void => setTypePassword('text')

	const onShowClosedEyeClick = (): void => setTypePassword('password')

	return (
		<>
			{typePassword === 'password'
				? <img className={style.eye} onClick={onShowOpenEyeClick} src={openEye} />
				: <img className={style.eye} onClick={onShowClosedEyeClick} src={closedEye} />}
		</>
	)
}
