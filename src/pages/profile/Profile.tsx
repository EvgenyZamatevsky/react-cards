import { Path } from 'enums'
import React, { ChangeEvent, FC, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { ReturnComponentType } from 'types'
import avatar from 'assets/images/avatar.png'
import { useAppDispatch } from 'store/hooks'
import { logOut, updateAuthorizedUser } from 'store/asyncActions'
import { useSelector } from 'react-redux'
import { selectAuthorizedUserData, selectIsAuth } from 'store/selectors'
import { EMPTY_STRING } from 'constants/base'
import style from './Profile.module.scss'

type ProfilePropsType = {

}

export const Profile: FC<ProfilePropsType> = (): ReturnComponentType => {

	const dispatch = useAppDispatch()

	const isAuth = useSelector(selectIsAuth)
	const authorizedUserData = useSelector(selectAuthorizedUserData)

	const [authorizedUserName, setAuthorizedUserName] = useState(authorizedUserData?.name)

	const avatarAuthorizedUser = authorizedUserData?.avatar ? authorizedUserData?.avatar : avatar

	const onInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
		setAuthorizedUserName(event.currentTarget.value)
	}

	const updateAuthorizedUserName = (): void => {
		const trimmedAuthorizedUserName = authorizedUserName?.trim()

		if (trimmedAuthorizedUserName !== EMPTY_STRING) {
			dispatch(updateAuthorizedUser({ name: trimmedAuthorizedUserName }))
		}
	}

	const onLogOutClick = (): void => {
		dispatch(logOut())
	}

	if (!isAuth) {
		return <Navigate to={Path.LOGIN} />
	}

	return (
		<div className={style.profile}>
			<div className={style.body}>
				<h2 className={style.title}>Personal Information</h2>
				<button className={style.logOut} onClick={onLogOutClick}>Log Out</button >
				<img className={style.avatar} src={avatarAuthorizedUser} alt='avatar' />
				<div className={style.file}>
					<input type='file' />
				</div>
				<div className={style.form}>
					<input className={style.nickname} type='type' placeholder='Nickname' value={authorizedUserName} onChange={onInputChange} />
					<input disabled className={style.email} type='email' defaultValue={authorizedUserData?.email} />
					<button className={style.saveBtn} onClick={updateAuthorizedUserName}>Save</button>
				</div>
			</div>
		</div>
	)
}
