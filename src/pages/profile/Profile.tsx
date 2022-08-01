import { Path } from 'enums'
import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { ReturnComponentType } from 'types'
import avatar from 'assets/images/avatar.png'
import { useAppDispatch } from 'store/hooks'
import { logOut, updateAuthorizedUser } from 'store/asyncActions'
import { useSelector } from 'react-redux'
import { selectAuthorizedUserData, selectIsAuth } from 'store/selectors'
import { EMPTY_STRING } from 'constants/base'
import logOutIcon from 'assets/icons/logOut.png'
import arrow from 'assets/icons/arrow.svg'
import style from './Profile.module.scss'
import { EditableItem } from 'components'

type ProfilePropsType = {

}

export const Profile: FC<ProfilePropsType> = (): ReturnComponentType => {

	const dispatch = useAppDispatch()

	const isAuth = useSelector(selectIsAuth)
	const authorizedUserData = useSelector(selectAuthorizedUserData)

	//const [authorizedUserName, setAuthorizedUserName] = useState(authorizedUserData?.name)

	const avatarAuthorizedUser = authorizedUserData?.avatar ? authorizedUserData?.avatar : avatar

	// const onInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
	// 	setAuthorizedUserName(event.currentTarget.value)
	// }

	const handleUpdateNameBlurAndKeyDown = (newName: string): void => {
		dispatch(updateAuthorizedUser({ name: newName }))
	}

	const onLogOutClick = (): void => {
		dispatch(logOut())
	}

	if (!isAuth) {
		return <Navigate to={Path.LOGIN} />
	}

	return (
		<div className={style.container}>
			<Link to={Path.PACKS} className={style.backToPacksListBtn}>
				<img src={arrow} alt='' />
				<div>Back to Packs List</div>
			</Link>
			<div className={style.content}>
				<h2 className={style.title}>Personal Information</h2>
				<img className={style.avatar} src={avatarAuthorizedUser} alt='avatar' />
				<EditableItem currentValue={authorizedUserData!?.name} changeCurrentValue={handleUpdateNameBlurAndKeyDown} />
				<div className={style.email}>{authorizedUserData?.email}</div>
				<button className={style.LogOutBtn} onClick={onLogOutClick}>
					<img src={logOutIcon} alt='' />
					<div>Log out</div>
				</button>
			</div>
		</div>
	)
}
