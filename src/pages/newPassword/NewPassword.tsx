import { Path } from 'enums'
import React, { FC } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ReturnComponentType } from 'types'
import style from './NewPassword.module.scss'

type NewPasswordPropsType = {

}

export const NewPassword: FC<NewPasswordPropsType> = (): ReturnComponentType => {

	const params = useParams()

	return (
		<div className={style.newPassword}>
			<div className={style.body}>
				<h2 className={style.title}>PLAYING CARD</h2>
				<h2 className={style.subtitle}>Create a new password</h2>
				<form className={style.form}>
					<input className={style.password} type='password' placeholder='Password' />
					<div className={style.text}>Create a new password and we will send you
						further instructions by email</div>
					<button className={style.createNewPassword}>Create a new password</button>
				</form>
			</div>
		</div>
	)
}
