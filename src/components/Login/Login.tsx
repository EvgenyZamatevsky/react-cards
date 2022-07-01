import { LoginDataType } from 'api/auth/types'
import { Path } from 'enums'
import { useTypedDispatch } from 'hooks'
import React, { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { Navigate, NavLink } from 'react-router-dom'
import { setIsRegisterAC } from 'store/authReducer/actions'
import { selectIsRegister, selectIsAuth } from 'store/authReducer/selectors'
import { loginTC } from 'store/authReducer/thunks'
import { ReturnComponentType } from 'types'
import style from './Login.module.scss'

export type LoginPropsType = {

}

export const Login: FC<LoginPropsType> = (): ReturnComponentType => {

	const dispatch = useTypedDispatch()

	const isRegister = useSelector(selectIsRegister)
	const isAuth = useSelector(selectIsAuth)

	const { register, handleSubmit, formState: { errors, isValid } } = useForm<LoginDataType>(
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

	const onSignUpClick = () => {
		if (isRegister) {
			dispatch(setIsRegisterAC(false))
		}
	}

	const onSubmit: SubmitHandler<LoginDataType> = (data): void => {
		dispatch(loginTC(data))
	}

	if (isAuth) {
		return <Navigate to={Path.home} />
	}

	return (
		<div className={style.login}>
			<div className={style.content}>
				<h2 className={style.title}>Sign In</h2>
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
					<label>
						<input
							className={style.rememberMe}
							type='checkbox'
							{...register('rememberMe')} />
						Remember me
					</label>
					<NavLink to={Path.forgot} className={style.forgot}>
						Forgot Password
					</NavLink>
					<button type='submit' disabled={!isValid} className={style.loginBtn}>Login</button>
				</form>
				<div className={style.text}>Don’t have an account?</div>
				<NavLink to={Path.register} className={style.signUp} onClick={onSignUpClick}>Sign Up</NavLink>
			</div>
		</div>
	)
}
