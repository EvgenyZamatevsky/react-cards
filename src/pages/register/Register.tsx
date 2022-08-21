import React, { FC, useState } from 'react'
import { Eye, UniversalButton } from 'components'
import { useAppDispatch } from 'hooks'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { Navigate, Link } from 'react-router-dom'
import { registration } from 'store/asyncActions'
import { selectIsRegister, selectIsDisabled } from 'store/selectors'
import { ReturnComponentType } from 'types'
import { RegisterParamsType } from './types'
import { Path } from 'enums'
import style from './Register.module.scss'

export const Register: FC = (): ReturnComponentType => {

	const dispatch = useAppDispatch()

	const isRegister = useSelector(selectIsRegister)
	const isDisabled = useSelector(selectIsDisabled)

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

	const onSubmit: SubmitHandler<RegisterParamsType> = ({ email, password }): void => {
		dispatch(registration({ email, password }))
	}

	if (isRegister) {
		return <Navigate to={Path.LOGIN} />
	}

	return (
		<div className={style.register}>
			<div className={style.container}>
				<h2 className={style.title}>Sign Up</h2>
				<form className={style.form} onSubmit={handleSubmit(onSubmit)}>
					<div className={style.emailInputContainer}>
						<input className={style.emailInput} type='email' placeholder='Email' disabled={isDisabled}
							{...register('email', emailSettings)} />
						{errors?.email && <p className={style.errorEmailInput}>{errors?.email.message}</p>}
					</div>
					<div className={style.passwordInputContainer}>
						<input className={style.passwordInput} type={typePassword} placeholder='Password' disabled={isDisabled}
							{...register('password', passwordSettings)} />
						{errors?.password && <p className={style.errorPasswordInput}>{errors?.password.message}</p>}
						<Eye typePassword={typePassword} setTypePassword={setTypePassword} />
					</div>
					<div className={style.confirmPasswordInputContainer}>
						<input className={style.confirmPasswordInput} type={typeConfirmPassword} placeholder='Confirm password' disabled={isDisabled}
							{...register('confirmPassword', confirmPasswordSettings)} />
						{errors?.confirmPassword && <p className={style.errorConfirmPasswordInput}>{errors?.confirmPassword.message}</p>}
						<Eye typePassword={typeConfirmPassword} setTypePassword={setTypeConfirmPassword} />
					</div>
					<div className={style.bottom}>
						<UniversalButton primary type='submit' disabled={!isValid}>Sign Up</UniversalButton>
						<div className={style.text}>Already have an account?</div>
						<Link
							to={Path.LOGIN}
							className={`${style.signInBtn} ${isDisabled && style.disabledLink}`}
						>
							Sign In
						</Link>
					</div>
				</form>
			</div>
		</div>
	)
}
