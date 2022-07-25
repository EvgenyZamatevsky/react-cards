import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { ReturnComponentType } from 'types'
import style from './Register.module.scss'
import { Path } from 'enums/Path'
import { SubmitHandler, useForm } from 'react-hook-form'

type RegisterParamsType = {
	email: string
	password: string
	confirmPassword: string
}

type RegisterPropsType = {

}

export const Register: FC<RegisterPropsType> = (): ReturnComponentType => {

	const { register, handleSubmit, formState: { errors } } = useForm<RegisterParamsType>(
		{ mode: 'onBlur' },
	)

	const emailValidation = {
		required: 'Field is required!',
		pattern: {
			value: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
			message: 'Incorrect email!',
		}
	}

	const passwordValidation = {
		required: 'Field is required!',
	}

	const onSubmit: SubmitHandler<RegisterParamsType> = (data): void => {
		//dispatch(login(data))
		console.log(data)
	}

	return (
		<div className={style.register}>
			<div className={style.body}>
				<h2 className={style.title}>PLAYING CARD</h2>
				<h2 className={style.subtitle}>Sign Up</h2>
				<form className={style.form}>
					<input className={style.email} type='email' placeholder='Email'
						{...register('email', emailValidation)} />
					{errors?.email && <p className={style.errorMessage}>{errors?.email.message}</p>}
					<input className={style.password} type='password' placeholder='Password'
						{...register('password', passwordValidation)} />
					{errors?.password && <p className={style.errorMessage}>{errors?.password.message}</p>}
					<input className={style.confirmPassword} type='password' placeholder='Confirm password'
						{...register('confirmPassword', passwordValidation)} />
					{errors?.confirmPassword && <p className={style.errorMessage}>{errors?.confirmPassword.message}</p>}
					<button className={style.registerBtn} type='submit'>Register</button>
				</form>
				<div className={style.text}>Do you already have an account?</div>
				<Link to={Path.LOGIN} className={style.signUp}>Sign In</Link>
			</div>
		</div>
	)
}
