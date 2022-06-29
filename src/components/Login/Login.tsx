import { Path } from 'enums'
import React, { FC } from 'react'
import { NavLink } from 'react-router-dom'
import { ReturnComponentType } from 'types'
import style from './Login.module.scss'

export type LoginPropsType = {

}

export const Login: FC<LoginPropsType> = (): ReturnComponentType => {
	return (
		<div className={style.login}>
			<div className={style.content}>
				<h2 className={style.title}>Sign In</h2>
				<form className={style.form}>
					<input className={style.email} type='text' placeholder='Email' />
					<input className={style.password} type='password' placeholder='Password' />
					<label>
						<input className={style.rememberMe} type='checkbox' />
						Remember me
					</label>
				</form>
				<NavLink to={Path.forgot} className={style.forgot}>
					Forgot Password
				</NavLink>
				<button className={style.loginBtn}>Login</button>
				<span>Don’t have an account?</span>
				<NavLink to={Path.registration} className={style.signUp}>Sign Up</NavLink>
			</div>
		</div>
	)
}
