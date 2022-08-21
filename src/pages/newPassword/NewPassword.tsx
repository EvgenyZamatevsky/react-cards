import React, { FC, useState } from 'react'
import { Path } from 'enums'
import { Eye, UniversalButton } from 'components'
import { useAppDispatch } from 'hooks'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { setNewPassword } from 'store/asyncActions'
import { ReturnComponentType } from 'types'
import style from './NewPassword.module.scss'

export const NewPassword: FC = (): ReturnComponentType => {

	const dispatch = useAppDispatch()

	const navigate = useNavigate()
	const { token } = useParams<{ token: string }>()

	const [typePassword, setTypePassword] = useState('password')

	const { register, handleSubmit, formState: { errors, isValid } } = useForm<{ password: string }>(
		{ mode: 'onChange' },
	)

	const passwordSettings = {
		required: 'Field is required!',
		minLength: { value: 8, message: 'Min 8 characters!' },
	}

	const onSubmit: SubmitHandler<{ password: string }> = ({ password }): void => {
		dispatch(setNewPassword({ updatedPassword: password, resetPasswordToken: token as string }))
		navigate(Path.LOGIN)
	}

	return (
		<div className={style.newPassword}>
			<div className={style.container}>
				<h2 className={style.title}>Create new password</h2>
				<form className={style.form} onSubmit={handleSubmit(onSubmit)}>
					<div className={style.passwordInputContainer}>
						<input className={style.passwordInput} type={typePassword} placeholder='Password'
							{...register('password', passwordSettings)} />
						{errors?.password && <p className={style.errorPasswordInput}>{errors?.password.message}</p>}
						<Eye typePassword={typePassword} setTypePassword={setTypePassword} />
					</div>
					<div className={style.text}>Create new password and we will send you further instructions to email</div>
					<UniversalButton
						primary
						additionalPrimaryBtn={style.additionalPrimaryBtn}
						type='submit'
						disabled={!isValid}
					>
						Create new password
					</UniversalButton>
				</form>
			</div>
		</div>
	)
}
