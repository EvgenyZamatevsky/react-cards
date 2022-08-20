import React, { FC, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { LoginParamsType, ReturnComponentType } from 'types'
import { Path } from 'enums/Path'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useAppDispatch } from 'store/hooks'
import { login } from 'store/asyncActions'
import { useSelector } from 'react-redux'
import { selectIsAuth, selectIsDisabled, selectIsRegister } from 'store/selectors'
import openEye from 'assets/icons/openEye.svg'
import closedEye from 'assets/icons/closedEye.svg'
import style from './Login.module.scss'
import { setIsRegister } from 'store/slices'

export const Login: FC = (): ReturnComponentType => {

	const dispatch = useAppDispatch()

	const isAuth = useSelector(selectIsAuth)
	const isDisabled = useSelector(selectIsDisabled)
	const isRegister = useSelector(selectIsRegister)

	const [typePassword, setTypePassword] = useState('password')

	const { register, handleSubmit, formState: { errors, isValid } } = useForm<LoginParamsType>(
		{ mode: 'onChange' },
	)

	const emailSettings = {
		required: 'Field is required!',
		pattern: {
			value: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
			message: 'Incorrect email!',
		}
	}

	const passwordSettings = {
		required: 'Field is required!',
		minLength: { value: 8, message: 'Min 8 characters!' },
	}

	const onSetIsRegisterClick = (): void => {
		if (isRegister) {
			dispatch(setIsRegister(false))
		}
	}

	const showOpenEye = (): void => setTypePassword('text')

	const showClosedEye = (): void => setTypePassword('password')

	const onSubmit: SubmitHandler<LoginParamsType> = (data): void => {
		dispatch(login(data))
	}

	if (isAuth) {
		return <Navigate to={Path.PROFILE} />
	}

	return (
		<div className={style.login}>
			<div className={style.container}>
				<h2 className={style.title}>Sign in</h2>
				<form className={style.form} onSubmit={handleSubmit(onSubmit)}>
					<div className={style.emailFieldContainer}>
						<input className={style.emailField} type='email' placeholder='Email' disabled={isDisabled}
							{...register('email', emailSettings)} />
						{errors?.email && <p className={style.errorMessageEmailField}>{errors?.email.message}</p>}
					</div>
					<div className={style.passwordFieldContainer}>
						<input className={style.passwordField} type={typePassword} placeholder='Password' disabled={isDisabled}
							{...register('password', passwordSettings)} />
						{errors?.password && <p className={style.errorMessagePasswordField}>{errors?.password.message}</p>}
						{typePassword === 'password'
							? <button onClick={showOpenEye} disabled={isDisabled}><img className={style.eye} src={openEye} /></button>
							: <button onClick={showClosedEye} disabled={isDisabled}><img className={style.eye} src={closedEye} /></button>}
					</div>
					<div className={style.body}>
						<label className={style.label}>
							<input className={style.rememberMe} type='checkbox' disabled={isDisabled}
								{...register('rememberMe')} />
							Remember me
						</label>
						<Link
							to={Path.FORGOT}
							className={`${style.forgotLink} ${isDisabled && style.disabledLink}`}
						>
							Forgot Password?
						</Link>
					</div>
					<div className={style.bottom}>
						<button className={style.signInBtn} type='submit' disabled={!isValid}>Sign in</button>
						<div className={style.text}>Don’t have an account?</div>
						<Link
							to={Path.REGISTER}
							onClick={onSetIsRegisterClick}
							className={`${style.signUpBtn} ${isDisabled && style.disabledLink}`}
						>
							Sign Up
						</Link>
					</div>
				</form>
			</div>
		</div>
	)
}
