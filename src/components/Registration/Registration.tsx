import { Path } from 'enums'
import React, { FC } from 'react'
import { NavLink } from 'react-router-dom'
import { ReturnComponentType } from 'types'
import style from './Registration.module.scss'

export type RegistrationPropsType = {

}

export const Registration: FC<RegistrationPropsType> = (): ReturnComponentType => {
	return (
		<div className={style.registration}>
			<div className={style.content}>
				<h2 className={style.title}>Sign Up</h2>
				<form className={style.form}>
					<input className={style.email} type='text' placeholder='Email' />
					<input className={style.password} type='password' placeholder='Password' />
					<input className={style.confirmPassword} type='password' placeholder='Confirm password' />
				</form>
				<button className={style.register}>Register</button>
				<span>Already have an account?</span>
				<NavLink to={Path.login} className={style.signIn}>Sign in</NavLink>
			</div>
		</div>
	)
}
