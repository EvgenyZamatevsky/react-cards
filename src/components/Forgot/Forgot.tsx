import React, { FC } from 'react'
import { NavLink } from 'react-router-dom'
import { ReturnComponentType } from 'types'
import style from './Forgot.module.scss'
import { Path } from 'enums/Path'

export type ForgotPropsType = {

}

export const Forgot: FC<ForgotPropsType> = (): ReturnComponentType => {
	return (
		<div className={style.forgot}>
			<div className={style.content}>
				<h2 className={style.title}>Forgot your password?</h2>
				<input className={style.email} type='text' placeholder='Email' />
				<span className={style.text}>Enter your email address and we will send you further instructions</span>
				<NavLink to={Path.checkEmail} className={style.send}>Send instructions</NavLink>
				<span className={style.rememberPassword}>Did you remember your password?</span>
				<NavLink to={Path.login} className={style.tryLoggingIn}>Try logging in</NavLink>
			</div>
		</div>
	)
}
