import React, { FC } from 'react'
import { Path } from 'enums'
import { Navigate, useNavigate } from 'react-router-dom'
import { ReturnComponentType } from 'types'
import avatar from 'assets/images/avatar.png'
import { useAppDispatch } from 'store/hooks'
import { logOut, updateAuthorizedUser } from 'store/asyncActions'
import { useSelector } from 'react-redux'
import { selectAuthorizedUserData, selectIsAuth, selectIsDisabled } from 'store/selectors'
import logOutIcon from 'assets/icons/logOut.png'
import { EditableItem } from 'components'
import { BackPage } from 'components/common/backPage'
import style from './Profile.module.scss'

export const Profile: FC = (): ReturnComponentType => {

	const dispatch = useAppDispatch()

	const navigate = useNavigate()

	const isAuth = useSelector(selectIsAuth)
	const authorizedUserData = useSelector(selectAuthorizedUserData)
	const isDisabled = useSelector(selectIsDisabled)

	const avatarAuthorizedUser = authorizedUserData?.avatar ? authorizedUserData?.avatar : avatar

	const handleUpdateNameBlurAndKeyDown = (newName: string): void => {
		dispatch(updateAuthorizedUser({ name: newName }))
	}

	const onLogOutClick = (): void => {
		dispatch(logOut())
	}

	const handleBackPacksListClick = (): void => navigate(Path.PACKS)

	if (!isAuth) {
		return <Navigate to={Path.LOGIN} />
	}

	return (
		<div className={style.container}>
			<BackPage
				title={'Back to Packs List'}
				isDisabled={isDisabled}
				onBackPageClick={handleBackPacksListClick}
			/>
			<div className={style.content}>
				<h2 className={style.title}>Personal Information</h2>
				<img className={style.avatar} src={avatarAuthorizedUser} alt='avatar' />
				<EditableItem
					currentValue={authorizedUserData!?.name}
					isDisabled={isDisabled}
					changeCurrentValue={handleUpdateNameBlurAndKeyDown}
				/>
				<div className={style.email}>{authorizedUserData?.email}</div>
				<button
					className={style.LogOutBtn}
					onClick={onLogOutClick}
					disabled={isDisabled}
				>
					<img src={logOutIcon} alt='log Out' />
					<div>Log out</div>
				</button>
			</div>
		</div>
	)
}
