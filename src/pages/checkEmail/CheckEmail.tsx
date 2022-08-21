import React, { FC } from 'react'
import { Path } from 'enums'
import { Link, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectIsDisabled } from 'store/selectors'
import { ReturnComponentType } from 'types'
import writing from 'assets/icons/writing.png'
import style from './CheckEmail.module.scss'

export const CheckEmail: FC = (): ReturnComponentType => {

	const { email } = useParams<{ email: string }>()

	const isDisabled = useSelector(selectIsDisabled)

	return (
		<div className={style.container}>
			<div className={style.content}>
				<h2 className={style.title}>Check Email</h2>
				<img className={style.writingIcon} src={writing} alt='writing' />
				<div className={style.text}>We've sent an email with instructions to</div>
				<div className={style.email}>{email}</div>
				<Link
					to={Path.LOGIN}
					className={`${style.backToLoginBtn} ${isDisabled && style.disabledLink}`}
				>
					Back to login
				</Link>
			</div>
		</div>
	)
}
