import React, { FC, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { ReturnComponentType } from 'types'
import style from './Register.module.scss'
import { Path } from 'enums/Path'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useAppDispatch } from 'store/hooks'
import { registration } from 'store/asyncActions'
import { useSelector } from 'react-redux'
import { selectIsRegister } from 'store/selectors'
import openEye from 'assets/icons/openEye.svg'
import closedEye from 'assets/icons/closedEye.svg'
import { RegisterParamsType } from './types'

export const Register: FC = (): ReturnComponentType => {

	const dispatch = useAppDispatch()

	const isRegister = useSelector(selectIsRegister)

	const [typePassword, setTypePassword] = useState('password')
	const [typeConfirmPassword, setTypeConfirmPassword] = useState('password')

	const { register, handleSubmit, watch, formState: { errors, isValid } } = useForm<RegisterParamsType>(
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

	const confirmPasswordSettings = {
		required: 'Field is required!',
		minLength: { value: 8, message: 'Min 8 characters!' },
		validate: (value: string) => {
			if (watch('password') !== value) {
				return 'Your passwords do no match!'
			}
		}
	}

	const showOpenEyeForPasswordField = (): void => setTypePassword('text')

	const showClosedEyeForPasswordField = (): void => setTypePassword('password')

	const showOpenEyeForConfirmPasswordField = (): void => setTypeConfirmPassword('text')

	const showClosedEyeForConfirmPasswordField = (): void => setTypeConfirmPassword('password')

	const onSubmit: SubmitHandler<RegisterParamsType> = ({ email, password }): void => {
		dispatch(registration({ email, password }))
	}

	if (isRegister) {
		return <Navigate to={Path.LOGIN} />
	}

	return (
		<div className={style.container}>
			<div className={style.content}>
				<h2 className={style.title}>Sign Up</h2>
				<form className={style.form} onSubmit={handleSubmit(onSubmit)}>
					<div className={style.emailFieldContainer}>
						<input className={style.emailField} type='email' placeholder='Email'
							{...register('email', emailSettings)} />
						{errors?.email && <p className={style.errorEmailField}>{errors?.email.message}</p>}
					</div>
					<div className={style.passwordFieldContainer}>
						<input className={style.passwordField} type={typePassword} placeholder='Password'
							{...register('password', passwordSettings)} />
						{errors?.password && <p className={style.errorPasswordField}>{errors?.password.message}</p>}
						{typePassword === 'password'
							? <img className={style.eye} onClick={showOpenEyeForPasswordField} src={openEye} />
							: <img className={style.eye} onClick={showClosedEyeForPasswordField} src={closedEye} />}
					</div>
					<div className={style.confirmPasswordFieldContainer}>
						<input className={style.confirmPasswordField} type={typeConfirmPassword} placeholder='Confirm password'
							{...register('confirmPassword', confirmPasswordSettings)} />
						{errors?.confirmPassword && <p className={style.errorConfirmPasswordField}>{errors?.confirmPassword.message}</p>}
						{typeConfirmPassword === 'password'
							? <img className={style.eye} onClick={showOpenEyeForConfirmPasswordField} src={openEye} />
							: <img className={style.eye} onClick={showClosedEyeForConfirmPasswordField} src={closedEye} />}
					</div>
					<div className={style.bottom}>
						<button className={style.signUpBtn} type='submit' disabled={!isValid}>Sign Up</button>
						<div className={style.text}>Already have an account?</div>
						<Link to={Path.LOGIN} className={style.signInBtn}>Sign In</Link>
					</div>
				</form>
			</div>
		</div>
	)
}
