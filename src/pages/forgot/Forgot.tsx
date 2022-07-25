import React, { FC } from 'react'
import { Path } from 'enums'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { ReturnComponentType } from 'types'
import style from './Forgot.module.scss'
import { SubmitHandler, useForm } from 'react-hook-form'
import { forgotPassword } from 'store/asyncActions'
import { useAppDispatch } from 'store/hooks'

type ForgotPropsType = {

}

export const Forgot: FC<ForgotPropsType> = (): ReturnComponentType => {

	const dispatch = useAppDispatch()

	const navigate = useNavigate()

	const { register, handleSubmit, formState: { errors, isValid } } = useForm<{ email: string }>(
		{ mode: 'onChange' },
	)

	const emailValidation = {
		required: 'Field is required!',
		pattern: {
			value: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
			message: 'Incorrect email!',
		}
	}

	const onSubmit: SubmitHandler<{ email: string }> = ({ email }): void => {
		dispatch(forgotPassword(email))
		navigate(`/check-email/${email}`)
	}

	return (
		<div className={style.forgot}>
			<div className={style.body}>
				<h2 className={style.title}>PLAYING CARD</h2>
				<h2 className={style.subtitle}>Forgot your password?</h2>
				<form className={style.form} onSubmit={handleSubmit(onSubmit)}>
					<input className={style.email} type='email' placeholder='Email'
						{...register('email', emailValidation)} />
					{errors?.email && <p className={style.errorMessage}>{errors?.email.message}</p>}
					<div className={style.text}>Enter your email address and
						we will send you further instructions</div>
					<button className={style.sendInstructionsBtn} type='submit' disabled={!isValid}>Send instructions</button>
				</form>
				<div className={style.wording}>Did you remember your password?</div>
				<Link to={Path.LOGIN} className={style.tryLoggingIn}>Try logging in</Link>
			</div>
		</div>
	)
}
