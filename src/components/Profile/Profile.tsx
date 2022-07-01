import { Path } from 'enums'
import React, { FC, useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { ReturnComponentType } from 'types'
import style from './Profile.module.scss'
import { ProfileEdit } from './ProfileEdit'
import { UserInfo } from 'components/Profile/UserInfo/UserInfo'
import { selectIsAuth, selectUserData } from 'store/authReducer/selectors'

export type ProfilePropsType = {

}

export const Profile: FC<ProfilePropsType> = (): ReturnComponentType => {

	const isAuth = useSelector(selectIsAuth)
	const userData = useSelector(selectUserData)

	const [editProfile, setEditProfile] = useState<boolean>(false)

	const handleActivateEditProfileClick = useCallback((): void => {
		setEditProfile(true)
	}, [])

	if (!isAuth) {
		return <Navigate to={Path.login} />
	}

	return (
		<>
			{!editProfile
				? <div className={style.profile}>
					<div className={style.container}>
						<div className={style.navbar}>
							<UserInfo
								userData={userData}
								onActivateEditProfileClick={handleActivateEditProfileClick} />
						</div>
						<div className={style.content}>
							<h2 className={style.title}>My packs list</h2>
						</div>
					</div>
				</div>
				: <ProfileEdit
					setEditProfile={setEditProfile}
					userAvatar={userData?.avatar}
					initialNickname={userData?.name}
					initialImageUrl={userData?.avatar}
				/>}
		</>
	)
}
