import { Path } from 'enums'
import React, { FC } from 'react'
import { NavLink } from 'react-router-dom'
import { ReturnComponentType } from 'types'
import style from './NewPassword.module.scss'

export type NewPasswordPropsType = {

}

export const NewPassword: FC<NewPasswordPropsType> = (): ReturnComponentType => {
	return (
		<div className={style.newPassword}>
			<div className={style.content}>
				<h2 className={style.title}>Create new password</h2>
				<input className={style.password} type='password' placeholder='Password' />
				<div className={style.text}>Create new password and we will send you further instructions to email</div>
				<button className={style.createNewPassword}>Create new password</button>
				<div className={style.badToken}>Bad token?</div>
				<NavLink to={Path.forgot} className={style.forgotPassword}>Forgot Password</NavLink>
			</div>
		</div>
	)
}
