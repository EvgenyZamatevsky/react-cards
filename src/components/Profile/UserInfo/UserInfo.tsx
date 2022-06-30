import React, { FC, memo } from 'react'
import { Nullable, ReturnComponentType } from 'types'
import avatar from 'assets/images/avatar.svg'
import style from './UserInfo.module.scss'
import { useTypedDispatch } from 'store/hooks'
import { logOutTC } from 'store/middlewares'
import { UserDataType } from 'api/auth/types'

export type UserInfoPropsType = {
	userData: Nullable<UserDataType>
	onActivateEditProfileClick: () => void
}

export const UserInfo: FC<UserInfoPropsType> = memo(({ userData, onActivateEditProfileClick }): ReturnComponentType => {

	const dispatch = useTypedDispatch()

	const onLogOutClick = (): void => {
		dispatch(logOutTC())
	}

	return (
		<div className={style.userInfo}>
			<img className={style.avatarImage} src={userData?.avatar ? userData.avatar : avatar} />
			<div className={style.name}>{userData?.name}</div>
			<div className={style.job}>Front-end developer</div>
			<div className={style.buttons}>
				<button className={style.editProfile} onClick={onActivateEditProfileClick}>Edit profile</button>
				<button className={style.logOut} onClick={onLogOutClick}>Log Out</button>
			</div>
		</div>
	)
})
