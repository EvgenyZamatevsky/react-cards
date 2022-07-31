import React, { FC, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { LoginParamsType, ReturnComponentType } from 'types'
import { Path } from 'enums/Path'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useAppDispatch } from 'store/hooks'
import { login } from 'store/asyncActions'
import { useSelector } from 'react-redux'
import { selectIsAuth } from 'store/selectors'
import openEye from 'assets/icons/openEye.svg'
import closedEye from 'assets/icons/closedEye.svg'
import style from './Login.module.scss'

type LoginPropsType = {

}

export const Login: FC<LoginPropsType> = (): ReturnComponentType => {

	const dispatch = useAppDispatch()

	const isAuth = useSelector(selectIsAuth)

	const [typePassword, setTypePassword] = useState('password')

	const { register, handleSubmit, formState: { errors, isValid } } = useForm<LoginParamsType>(
		{ mode: 'onChange' },
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
		minLength: { value: 8, message: 'Min 8 characters!' },
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
		<div className={style.container}>
			<div className={style.content}>
				<h2 className={style.title}>Sign in</h2>
				<form className={style.form} onSubmit={handleSubmit(onSubmit)}>
					<div className={style.emailFieldContainer}>
						<input className={style.emailField} type='email' placeholder='Email'
							{...register('email', emailValidation)} />
						{errors?.email && <p className={style.errorEmailField}>{errors?.email.message}</p>}
					</div>
					<div className={style.passwordFieldContainer}>
						<input className={style.passwordField} type={typePassword} placeholder='Password'
							{...register('password', passwordValidation)} />
						{errors?.password && <p className={style.errorPasswordField}>{errors?.password.message}</p>}
						{typePassword === 'password'
							? <img className={style.eye} onClick={showOpenEye} src={openEye} />
							: <img className={style.eye} onClick={showClosedEye} src={closedEye} />}
					</div>
					<div className={style.body}>
						<label>
							<input className={style.rememberMe} type='checkbox'
								{...register('rememberMe')} />
							Remember me
						</label>
						<Link to={Path.FORGOT} className={style.forgot}>Forgot Password?</Link>
					</div>
					<div className={style.bottom}>
						<button className={style.signInBtn} type='submit' disabled={!isValid}>Sign in</button>
						<div className={style.text}>Don’t have an account?</div>
						<Link to={Path.REGISTER} className={style.signUpBtn}>Sign Up</Link>
					</div>
				</form>
			</div>
		</div>
	)
}
