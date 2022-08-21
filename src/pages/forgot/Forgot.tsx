import React, { FC } from 'react'
import { Path } from 'enums'
import { useAppDispatch } from 'hooks'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useNavigate, Link } from 'react-router-dom'
import { forgot } from 'store/asyncActions'
import { ReturnComponentType } from 'types'
import { ForgotParamsType } from './types'
import style from './Forgot.module.scss'
import { UniversalButton } from 'components'

export const Forgot: FC = (): ReturnComponentType => {

	const dispatch = useAppDispatch()

	const navigate = useNavigate()

	const { register, handleSubmit, formState: { errors, isValid } } = useForm<ForgotParamsType>(
		{ mode: 'onChange' },
	)

	const emailSettings = {
		required: 'Field is required!',
		pattern: {
			value: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
			message: 'Incorrect email!',
		}
	}

	const onSubmit: SubmitHandler<ForgotParamsType> = ({ email }): void => {
		dispatch(forgot(email))
		navigate(`${Path.CHECK_EMAIL}/${email}`)
	}

	return (
		<div className={style.forgot}>
			<div className={style.container}>
				<h2 className={style.title}>Forgot your password?</h2>
				<form className={style.form} onSubmit={handleSubmit(onSubmit)}>
					<input className={style.emailInput} type='email' placeholder='Email'
						{...register('email', emailSettings)} />
					{errors?.email && <p className={style.errorMessage}>{errors?.email.message}</p>}
					<div className={style.words}>Enter your email address and we will send you further instructions</div>
					<div className={style.bottom}>
						<UniversalButton primary type='submit' disabled={!isValid}>Send Instructions</UniversalButton>
						<div className={style.text}>Did you remember your password?</div>
						<Link to={Path.LOGIN} className={style.tryLoggingInBtn}>Try logging in</Link>
					</div>
				</form>
			</div>
		</div>
	)
}
