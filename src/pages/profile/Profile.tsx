import React, { FC } from 'react'
import { Path } from 'enums'
import { BackToPage, File, EditableItem, UniversalButton } from 'components'
import { useAppDispatch } from 'hooks'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { updateAuthorizedUserNameOrAvatar, logOut } from 'store/asyncActions'
import {
	selectAuthorizedUserName,
	selectAuthorizedUserEmail,
	selectIsDisabled,
	selectAuthorizedUserAvatar,
	selectIsAvatarBroken
} from 'store/selectors'
import { setErrorMessage, setIsAvatarBroken } from 'store/slices'
import { ReturnComponentType } from 'types'
import logOutIcon from 'assets/icons/logOut.png'
import defaultAvatar from 'assets/images/defaultAvatar.png'
import style from './Profile.module.scss'

export const Profile: FC = (): ReturnComponentType => {

	const dispatch = useAppDispatch()

	const navigate = useNavigate()

	const authorizedUserName = useSelector(selectAuthorizedUserName)
	const authorizedUserEmail = useSelector(selectAuthorizedUserEmail)
	const authorizedUserAvatar = useSelector(selectAuthorizedUserAvatar)
	const isDisabled = useSelector(selectIsDisabled)
	const isAvatarBroken = useSelector(selectIsAvatarBroken)

	const handleUpdateNameBlurOrKeyDown = (updatedName: string): void => {
		dispatch(updateAuthorizedUserNameOrAvatar({ name: updatedName }))
	}

	const onLogOutClick = (): void => {
		dispatch(logOut())
	}

	const handleBackToPacksListClick = (): void => {
		navigate(Path.PACKS)
	}

	const onImgError = (): void => {
		dispatch(setIsAvatarBroken(true))
		dispatch(setErrorMessage('Curve picture'))
	}

	return (
		<div className={style.profile}>

			<BackToPage
				isDisabled={isDisabled}
				title={'Back to Packs List'}
				onBackToPageClick={handleBackToPacksListClick}
			/>

			<div className={style.container}>
				<h2 className={style.title}>Personal Information</h2>
				<img
					className={style.avatarImg}
					src={isAvatarBroken ? defaultAvatar : authorizedUserAvatar}
					alt='avatar'
					onError={onImgError}
				/>
				<File isDisabled={isDisabled} />

				<EditableItem
					currentValue={authorizedUserName}
					isDisabled={isDisabled}
					updateValue={handleUpdateNameBlurOrKeyDown}
				/>

				<div className={style.email}>{authorizedUserEmail}</div>
				<UniversalButton
					secondary
					onClick={onLogOutClick}
					disabled={isDisabled}
				>
					<img src={logOutIcon} alt='log Out' />
					Log out
				</UniversalButton>
			</div>
		</div>
	)
}
