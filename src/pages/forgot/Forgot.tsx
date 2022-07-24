import React, { FC } from 'react'
import { Path } from 'enums'
import { Link } from 'react-router-dom'
import { ReturnComponentType } from 'types'
import style from './Forgot.module.scss'

type ForgotPropsType = {

}

export const Forgot: FC<ForgotPropsType> = (): ReturnComponentType => {
	return (
		<div className={style.forgot}>
			<div className={style.body}>
				<h2 className={style.title}>PLAYING CARD</h2>
				<h2 className={style.subtitle}>Forgot your password?</h2>
				<form className={style.form}>
					<input className={style.email} type='email' placeholder='Email' />
					<div className={style.text}>Enter your email address and
						we will send you further instructions</div>
					<button className={style.instructions}>Send instructions</button>
				</form>
				<div className={style.wording}>Did you remember your password?</div>
				<Link to={Path.LOGIN} className={style.tryLoggingIn}>Try logging in</Link>
			</div>
		</div>
	)
}
