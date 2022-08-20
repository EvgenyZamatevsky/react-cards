import React, { FC } from 'react'
import { Path } from 'enums'
import { Link, useNavigate } from 'react-router-dom'
import { ReturnComponentType } from 'types'
import { SubmitHandler, useForm } from 'react-hook-form'
import { forgot } from 'store/asyncActions'
import { useAppDispatch } from 'store/hooks'
import style from './Forgot.module.scss'

export const Forgot: FC = (): ReturnComponentType => {

	const dispatch = useAppDispatch()

	const navigate = useNavigate()

	const { register, handleSubmit, formState: { errors, isValid } } = useForm<{ email: string }>(
		{ mode: 'onChange' },
	)

	const emailSettings = {
		required: 'Field is required!',
		pattern: {
			value: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
			message: 'Incorrect email!',
		}
	}

	const onSubmit: SubmitHandler<{ email: string }> = ({ email }): void => {
		dispatch(forgot(email))
		navigate(`${Path.CHECK_EMAIL}/${email}`)
	}

	return (
		<div className={style.forgot}>
			<div className={style.container}>
				<h2 className={style.title}>Forgot your password?</h2>
				<form className={style.form} onSubmit={handleSubmit(onSubmit)}>
					<input className={style.emailField} type='email' placeholder='Email'
						{...register('email', emailSettings)} />
					{errors?.email && <p className={style.errorMessage}>{errors?.email.message}</p>}
					<div className={style.words}>Enter your email address and we will send you further instructions</div>
					<div className={style.bottom}>
						<button className={style.sendInstructionsBtn} type='submit' disabled={!isValid}>Send Instructions</button>
						<div className={style.text}>Did you remember your password?</div>
						<Link to={Path.LOGIN} className={style.tryLoggingInBtn}>Try logging in</Link>
					</div>
				</form>
			</div>
		</div>
	)
}
