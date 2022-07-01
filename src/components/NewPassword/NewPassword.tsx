import { Path } from 'enums'
import { useTypedDispatch } from 'hooks'
import React, { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { newPasswordTC } from 'store/authReducer/thunks'
import { ReturnComponentType } from 'types'
import style from './NewPassword.module.scss'

export type NewPasswordPropsType = {

}

export const NewPassword: FC<NewPasswordPropsType> = (): ReturnComponentType => {

	const dispatch = useTypedDispatch()

	const params = useParams<{ token: string }>()
	const navigate = useNavigate()

	const { register, handleSubmit, formState: { errors, isValid } } = useForm<{ password: string }>(
		{ mode: 'onChange' },
	)

	const validationForPassword = {
		required: 'Field is required!',
		minLength: { value: 8, message: 'Min 8 characters!' },
	}

	const onSubmit: SubmitHandler<{ password: string }> = (data): void => {
		dispatch(newPasswordTC({ password: data.password, resetPasswordToken: params.token as string }))
		navigate(Path.login)
	}

	return (
		<div className={style.newPassword}>
			<div className={style.content}>
				<h2 className={style.title}>Create new password</h2>
				<form className={style.form} onSubmit={handleSubmit(onSubmit)}>
					<input
						className={style.password}
						type='password'
						placeholder='Password'
						{...register('password', validationForPassword)} />
					{errors?.password && <p className={style.fieldError}>{errors?.password.message}</p>}
					<div className={style.text}>Create new password and we will send you further instructions to email</div>
					<button type='submit' disabled={!isValid} className={style.createNewPassword}>Create new password</button>
				</form>
				<div className={style.badToken}>Bad token?</div>
				<NavLink to={Path.forgot} className={style.forgotPassword}>Forgot Password</NavLink>
			</div>
		</div>
	)
}
