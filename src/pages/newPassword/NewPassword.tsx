import { Path } from 'enums'
import React, { FC, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { setNewPassword } from 'store/asyncActions'
import { useAppDispatch } from 'store/hooks'
import { ReturnComponentType } from 'types'
import openEye from 'assets/icons/openEye.svg'
import closedEye from 'assets/icons/closedEye.svg'
import style from './NewPassword.module.scss'

export const NewPassword: FC = (): ReturnComponentType => {

	const dispatch = useAppDispatch()

	const navigate = useNavigate()

	const { token } = useParams()

	const [typePassword, setTypePassword] = useState('password')

	const { register, handleSubmit, formState: { errors, isValid } } = useForm<{ password: string }>(
		{ mode: 'onChange' },
	)

	const passwordSettings = {
		required: 'Field is required!',
		minLength: { value: 8, message: 'Min 8 characters!' },
	}

	const showOpenEye = (): void => setTypePassword('text')

	const showClosedEye = (): void => setTypePassword('password')

	const onSubmit: SubmitHandler<{ password: string }> = ({ password }): void => {
		dispatch(setNewPassword({ password, resetPasswordToken: token as string }))
		navigate(Path.LOGIN)
	}

	return (
		<div className={style.container}>
			<div className={style.content}>
				<h2 className={style.title}>Create new password</h2>
				<form className={style.form} onSubmit={handleSubmit(onSubmit)}>
					<div className={style.passwordFieldContainer}>
						<input className={style.passwordField} type={typePassword} placeholder='Password'
							{...register('password', passwordSettings)} />
						{errors?.password && <p className={style.errorPasswordField}>{errors?.password.message}</p>}
						{typePassword === 'password'
							? <img className={style.eye} onClick={showOpenEye} src={openEye} />
							: <img className={style.eye} onClick={showClosedEye} src={closedEye} />}
					</div>
					<div className={style.text}>Create new password and we will send you further instructions to email</div>
					<button className={style.createNewPasswordBtn} type='submit' disabled={!isValid}>Create new password</button>
				</form>
			</div>
		</div>
	)
}
