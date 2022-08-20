import React, { FC } from 'react'
import { Path } from 'enums'
import { Navigate, useNavigate } from 'react-router-dom'
import { ReturnComponentType } from 'types'
import { useAppDispatch } from 'hooks'
import { logOut, updateAuthorizedUserNameOrAvatar } from 'store/asyncActions'
import { useSelector } from 'react-redux'
import logOutIcon from 'assets/icons/logOut.png'
import { EditableItem, InputFile } from 'components'
import { BackPage } from 'components/common/backPage'
import style from './Profile.module.scss'
import {
	selectAuthorizedUserEmail,
	selectAuthorizedUserName,
	selectIsAuth,
	selectIsDisabled
} from 'store/selectors'
import { resetMinValueAndMaxValue } from 'store/slices'

export const Profile: FC = (): ReturnComponentType => {

	const dispatch = useAppDispatch()

	const navigate = useNavigate()

	const isAuth = useSelector(selectIsAuth)
	const authorizedUserName = useSelector(selectAuthorizedUserName)
	const authorizedUserEmail = useSelector(selectAuthorizedUserEmail)
	const isDisabled = useSelector(selectIsDisabled)

	const handleUpdateNameBlurAndKeyDown = (newName: string): void => {
		dispatch(updateAuthorizedUserNameOrAvatar({ name: newName }))
	}

	const onLogOutClick = (): void => {
		dispatch(logOut())
	}

	const handleBackPacksListClick = (): void => {
		navigate(Path.PACKS)
		dispatch(resetMinValueAndMaxValue())
	}

	if (!isAuth) {
		return <Navigate to={Path.LOGIN} />
	}

	return (
		<div className={style.profile}>

			<BackPage
				title={'Back to Packs List'}
				onBackPageClick={handleBackPacksListClick}
			/>

			<div className={style.container}>
				<h2 className={style.title}>Personal Information</h2>
				<InputFile />

				<EditableItem
					currentValue={authorizedUserName}
					isDisabled={isDisabled}
					changeCurrentValue={handleUpdateNameBlurAndKeyDown}
				/>

				<div className={style.email}>{authorizedUserEmail}</div>

				<button
					className={style.LogOutBtn}
					onClick={onLogOutClick}
					disabled={isDisabled}
				>
					<img src={logOutIcon} alt='log Out' />
					Log out
				</button>
			</div>
		</div>
	)
}
