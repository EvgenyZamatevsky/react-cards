import React, { FC, useState } from 'react'
import { Eye, UniversalButton } from 'components'
import { Path } from 'enums'
import { useAppDispatch } from 'hooks'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { Navigate, Link, useLocation } from 'react-router-dom'
import { login } from 'store/asyncActions'
import { selectIsAuth, selectIsDisabled, selectIsRegister } from 'store/selectors'
import { setIsRegister } from 'store/slices'
import { ReturnComponentType } from 'types'
import { LocationStateType, LoginParamsType } from './types'
import style from './Login.module.scss'

export const Login: FC = (): ReturnComponentType => {

	const dispatch = useAppDispatch()

	const location = useLocation()

	const isAuth = useSelector(selectIsAuth)
	const isDisabled = useSelector(selectIsDisabled)
	const isRegister = useSelector(selectIsRegister)

	const [typePassword, setTypePassword] = useState('password')

	const fromPage = (location.state as LocationStateType)?.from?.pathname || Path.HOME

	const { register, handleSubmit, formState: { errors, isValid } } = useForm<LoginParamsType>({
		mode: 'onChange',
		defaultValues: { email: 'nya-admin@nya.nya', password: '1qazxcvBG', rememberMe: false }
	},
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

	const onSubmit: SubmitHandler<LoginParamsType> = (data): void => {
		dispatch(login(data))
	}

	if (isAuth) {
		return <Navigate to={fromPage} />
	}

	return (
		<div className={style.login}>
			<div className={style.container}>
				<h2 className={style.title}>Sign in</h2>
				<form className={style.form} onSubmit={handleSubmit(onSubmit)}>
					<div className={style.emailInputContainer}>
						<input className={style.emailInput} type='email' placeholder='Email' disabled={isDisabled}
							{...register('email', emailSettings)} />
						{errors?.email && <p className={style.errorMessageEmailInput}>{errors?.email.message}</p>}
					</div>
					<div className={style.passwordInputContainer}>
						<input className={style.passwordInput} type={typePassword} placeholder='Password' disabled={isDisabled}
							{...register('password', passwordSettings)} />
						{errors?.password && <p className={style.errorMessagePasswordInput}>{errors?.password.message}</p>}
						<Eye typePassword={typePassword} setTypePassword={setTypePassword} />
					</div>
					<div className={style.body}>
						<label className={style.label}>
							<input className={style.rememberMeCheckbox} type='checkbox' disabled={isDisabled}
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
						<UniversalButton primary type='submit' disabled={!isValid}>Sign in</UniversalButton>
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
