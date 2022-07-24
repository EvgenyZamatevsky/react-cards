import { Path } from 'enums'
import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { ReturnComponentType } from 'types'
import style from './CheckEmail.module.scss'
import writing from 'assets/icons/writing.png'

type CheckEmailPropsType = {

}

export const CheckEmail: FC<CheckEmailPropsType> = (): ReturnComponentType => {
	return (
		<div className={style.checkEmail}>
			<div className={style.body}>
				<h2 className={style.title}>PLAYING CARD</h2>
				<img className={style.writingIcon} src={writing} alt='writing' />

				<div className={style.instructions}>We've sent an email with instructions to</div>
				<div className={style.email}>example@gmail.com</div>
				<div className={style.text}>You can close this window and click on the link from our email to continue the password recovery.</div>
			</div>
		</div>
	)
}
