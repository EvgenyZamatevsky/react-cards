import React, { FC } from 'react'
import { ReturnComponentType } from 'types'
import message from 'assets/images/message.svg'
import style from './CheckEmail.module.scss'

export type CheckEmailPropsType = {

}

export const CheckEmail: FC<CheckEmailPropsType> = (): ReturnComponentType => {
	return (
		<div className={style.checkEmail}>
			<div className={style.content}>
				<h2 className={style.title}>Check Email</h2>
				<img className={style.image} src={message} />
				<div className={style.rememberPassword}>We’ve sent an Email with instructions to <span>example@gmail.com</span></div>
			</div>
		</div>
	)
}
