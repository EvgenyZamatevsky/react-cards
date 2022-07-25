import React, { FC } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { LoginParamsType, ReturnComponentType } from 'types'
import style from './Login.module.scss'
import { Path } from 'enums/Path'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useAppDispatch } from 'store/hooks'
import { login } from 'store/asyncActions'
import { useSelector } from 'react-redux'
import { selectIsAuth } from 'store/selectors'

type LoginPropsType = {

}

export const Login: FC<LoginPropsType> = (): ReturnComponentType => {

	const dispatch = useAppDispatch()

	const isAuth = useSelector(selectIsAuth)

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

	const onSubmit: SubmitHandler<LoginParamsType> = (data): void => {
		dispatch(login(data))
	}

	if (isAuth) {
		return <Navigate to={Path.PROFILE} />
	}

	return (
		<div className={style.login}>
			<div className={style.body}>
				<h2 className={style.title}>PLAYING CARD</h2>
				<h2 className={style.subtitle}>Sign in</h2>
				<form className={style.form} onSubmit={handleSubmit(onSubmit)}>
					<input className={style.email} type='email' placeholder='Email'
						{...register('email', emailValidation)} />
					{errors?.email && <p className={style.errorMessage}>{errors?.email.message}</p>}
					<input className={style.password} type='password' placeholder='Password'
						{...register('password', passwordValidation)} />
					{errors?.password && <p className={style.errorMessage}>{errors?.password.message}</p>}
					<div className={style.content}>
						<label>
							<input className={style.rememberMe} type='checkbox'
								{...register('rememberMe')} />
							Remember me
						</label>
						<Link to={Path.FORGOT} className={style.forgot}>Forgot Password</Link>
					</div>
					<button className={style.loginBtn} type='submit' disabled={!isValid}>Login</button>
				</form>
				<div className={style.text}>Don’t have an account?</div>
				<Link to={Path.REGISTER} className={style.signUp}>Sign Up</Link>
			</div>
		</div>
	)
}
