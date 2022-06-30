import React, { FC } from 'react'
import { ReturnComponentType } from 'types'
import message from 'assets/images/message.svg'
import style from './CheckEmail.module.scss'
import { useParams } from 'react-router-dom'

export type CheckEmailPropsType = {

}

export const CheckEmail: FC<CheckEmailPropsType> = (): ReturnComponentType => {

	const { email } = useParams<{ email: string }>()

	return (
		<div className={style.checkEmail}>
			<div className={style.content}>
				<h2 className={style.title}>Check Email</h2>
				<img className={style.image} src={message} />
				<div className={style.rememberPassword}>We’ve sent an Email with instructions to <span>{email}</span></div>
			</div>
		</div>
	)
}
