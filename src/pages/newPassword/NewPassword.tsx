import { Path } from 'enums'
import React, { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { setNewPassword } from 'store/asyncActions'
import { useAppDispatch } from 'store/hooks'
import { ReturnComponentType } from 'types'
import style from './NewPassword.module.scss'

type NewPasswordPropsType = {

}

export const NewPassword: FC<NewPasswordPropsType> = (): ReturnComponentType => {

	const dispatch = useAppDispatch()

	const navigate = useNavigate()

	const { token } = useParams()

	const { register, handleSubmit, formState: { errors, isValid } } = useForm<{ password: string }>(
		{ mode: 'onChange' },
	)

	const passwordValidation = {
		required: 'Field is required!',
		minLength: { value: 8, message: 'Min 8 characters!' },
	}

	const onSubmit: SubmitHandler<{ password: string }> = ({ password }): void => {
		console.log(password, token)
		dispatch(setNewPassword({ password, resetPasswordToken: token as string }))
		navigate(Path.LOGIN)
	}

	return (
		<div className={style.newPassword}>
			<div className={style.body}>
				<h2 className={style.title}>PLAYING CARD</h2>
				<h2 className={style.subtitle}>Create a new password</h2>
				<form className={style.form} onSubmit={handleSubmit(onSubmit)}>
					<input className={style.password} type='password' placeholder='Password'
						{...register('password', passwordValidation)} />
					{errors?.password && <p className={style.errorMessage}>{errors?.password.message}</p>}
					<div className={style.text}>Create a new password and we will send you
						further instructions by email</div>
					<button className={style.createNewPassword} type='submit' disabled={!isValid}>Create a new password</button>
				</form>
			</div>
		</div>
	)
}
