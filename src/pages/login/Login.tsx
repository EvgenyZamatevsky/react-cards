import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { ReturnComponentType } from 'types'
import style from './Login.module.scss'
import { Path } from 'enums/Path'

type LoginPropsType = {

}

export const Login: FC<LoginPropsType> = (): ReturnComponentType => {
	return (
		<div className={style.login}>
			<div className={style.body}>
				<h2 className={style.title}>PLAYING CARD</h2>
				<h2 className={style.subtitle}>Sign in</h2>
				<form className={style.form}>
					<input className={style.email} type='email' placeholder='Email' />
					<input className={style.password} type='password' placeholder='Password' />
					<div className={style.content}>
						<label>
							<input className={style.rememberMe} type='checkbox' />
							Remember me
						</label>
						<Link to={Path.FORGOT} className={style.forgot}>Forgot Password</Link>
					</div>
					<button className={style.loginBtn}>Login</button>
				</form>
				<div className={style.text}>Don’t have an account?</div>
				<Link to={Path.REGISTER} className={style.signUp}>Sign Up</Link>
			</div>
		</div>
	)
}
