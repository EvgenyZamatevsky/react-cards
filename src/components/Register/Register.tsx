import { Path } from 'enums'
import React, { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { Navigate, NavLink } from 'react-router-dom'
import { useTypedDispatch } from 'store/hooks'
import { registerTC } from 'store/middlewares'
import { ReturnComponentType } from 'types'
import { RegisterPropsType, RegisterParamsType } from './types'
import style from './Register.module.scss'
import { selectIsRegister } from 'store/selectors'

export const Register: FC<RegisterPropsType> = (): ReturnComponentType => {

	const dispatch = useTypedDispatch()

	const isRegister = useSelector(selectIsRegister)

	const { register, handleSubmit, watch, formState: { errors, isValid } } = useForm<RegisterParamsType>(
		{ mode: 'onChange' },
	)

	const validationForEmail = {
		required: 'Field is required!',
		pattern: {
			value: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
			message: 'Incorrect email!',
		}
	}

	const validationForPassword = {
		required: 'Field is required!',
		minLength: { value: 8, message: 'Min 8 characters!' },
	}

	const validationForConfirmPassword = {
		required: 'Field is required!',
		minLength: { value: 8, message: 'Min 8 characters!' },
		validate: (value: string) => {
			if (watch('password') !== value) {
				return 'Your passwords do no match!'
			}
		}
	}

	const onSubmit: SubmitHandler<RegisterParamsType> = (data): void => {
		dispatch(registerTC(data))
	}

	if (isRegister) {
		return <Navigate to={Path.login} />
	}

	return (
		<div className={style.register}>
			<div className={style.content}>
				<h2 className={style.title}>Sign Up</h2>
				<form className={style.form} onSubmit={handleSubmit(onSubmit)}>
					<input
						className={style.email}
						type='text'
						placeholder='Email'
						{...register('email', validationForEmail)} />
					{errors?.email && <p className={style.fieldError}>{errors?.email.message}</p>}
					<input
						className={style.password}
						type='password'
						placeholder='Password'
						{...register('password', validationForPassword)} />
					{errors?.password && <p className={style.fieldError}>{errors?.password.message}</p>}
					<input
						className={style.confirmPassword}
						type='password'
						placeholder='Confirm password'
						{...register('confirmPassword', validationForConfirmPassword)} />
					{errors?.confirmPassword && <p className={style.fieldError}>{errors?.confirmPassword.message}</p>}
					<button type='submit' disabled={!isValid} className={style.registerBtn}>Register</button>
				</form>
				<div className={style.text}>Already have an account?</div>
				<NavLink to={Path.login} className={style.signIn}>Sign in</NavLink>
			</div>
		</div>
	)
}
