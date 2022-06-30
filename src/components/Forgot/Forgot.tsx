import React, { FC } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { ReturnComponentType } from 'types'
import style from './Forgot.module.scss'
import { Path } from 'enums/Path'
import { useTypedDispatch } from 'store/hooks'
import { forgotTC } from 'store/middlewares'
import { SubmitHandler, useForm } from 'react-hook-form'

export type ForgotPropsType = {

}

export const Forgot: FC<ForgotPropsType> = (): ReturnComponentType => {

	const dispatch = useTypedDispatch()

	const navigate = useNavigate()

	const { register, handleSubmit, formState: { errors, isValid } } = useForm<{ email: string }>(
		{ mode: 'onChange' },
	)

	const validationForEmail = {
		required: 'Field is required!',
		pattern: {
			value: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
			message: 'Incorrect email!',
		}
	}

	const onSubmit: SubmitHandler<{ email: string }> = (data): void => {
		dispatch(forgotTC(data.email))
		navigate(`${Path.checkEmail}/${data.email}`)
	}

	return (
		<div className={style.forgot}>
			<div className={style.content}>
				<h2 className={style.title}>Forgot your password?</h2>
				<form className={style.form} onSubmit={handleSubmit(onSubmit)}>
					<input
						className={style.email}
						type='text'
						placeholder='Email'
						{...register('email', validationForEmail)} />
					{errors?.email && <p className={style.fieldError}>{errors?.email.message}</p>}
					<span className={style.text}>Enter your email address and we will send you further instructions</span>
					<button type='submit' className={style.send} disabled={!isValid}>Send instructions</button>
				</form>
				<span className={style.rememberPassword}>Did you remember your password?</span>
				<NavLink to={Path.login} className={style.tryLoggingIn}>Try logging in</NavLink>
			</div>
		</div>
	)
}
