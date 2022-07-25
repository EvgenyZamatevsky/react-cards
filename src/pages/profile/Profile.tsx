import { Path } from 'enums'
import React, { FC } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { ReturnComponentType } from 'types'
import style from './Profile.module.scss'
import avatar from 'assets/images/avatar.png'
import { useAppDispatch } from 'store/hooks'
import { logOut } from 'store/asyncActions'
import { useSelector } from 'react-redux'
import { selectIsAuth } from 'store/selectors'

type ProfilePropsType = {

}

export const Profile: FC<ProfilePropsType> = (): ReturnComponentType => {

	const dispatch = useAppDispatch()

	const isAuth = useSelector(selectIsAuth)

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
				<img className={style.avatar} src={avatar} alt='avatar' />
				<div className={style.file}>
					<input type='file' />
				</div>
				<form className={style.form}>
					<input className={style.nickname} type='type' placeholder='Nickname' value={'ZaM'} onChange={() => { }} />
					<input disabled className={style.email} type='email' value={'example@gmail.com'} />
					<button className={style.saveBtn}>Save</button>
				</form>
			</div>
		</div>
	)
}
