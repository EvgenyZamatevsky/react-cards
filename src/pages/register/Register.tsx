import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { ReturnComponentType } from 'types'
import style from './Register.module.scss'
import { Path } from 'enums/Path'

type RegisterPropsType = {

}

export const Register: FC<RegisterPropsType> = (): ReturnComponentType => {
	return (
		<div className={style.register}>
			<div className={style.body}>
				<h2 className={style.title}>PLAYING CARD</h2>
				<h2 className={style.subtitle}>Sign Up</h2>
				<form className={style.form}>
					<input className={style.email} type='email' placeholder='Email' />
					<input className={style.password} type='password' placeholder='Password' />
					<input className={style.confirmPassword} type='password' placeholder='Confirm password' />
					<button className={style.registerBtn}>Register</button>
				</form>
				<div className={style.text}>Do you already have an account?</div>
				<Link to={Path.LOGIN} className={style.signUp}>Sign In</Link>
			</div>
		</div>
	)
}
