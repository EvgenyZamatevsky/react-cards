import React, { FC } from 'react'
import { ReturnComponentType } from 'types'
import { PopupPropsType } from './types'
import { UniversalButton } from 'components/common'
import { useNavigate } from 'react-router-dom'
import { logOut } from 'store/asyncActions'
import { Path } from 'enums'
import { useAppDispatch } from 'hooks'
import logOutIcon from 'assets/icons/logOut.png'
import person from 'assets/icons/person.svg'
import style from './Popup.module.scss'

export const Popup: FC<PopupPropsType> = ({ setIsVisiblePopup }): ReturnComponentType => {

	const dispatch = useAppDispatch()

	const navigate = useNavigate()

	const onLogOutClick = (): void => {
		dispatch(logOut())
		setIsVisiblePopup(false)
	}

	const onGoToProfileClick = (): void => {
		navigate(Path.PROFILE)
		setIsVisiblePopup(false)
	}

	return (
		<div className={style.popup}>
			<UniversalButton className={style.profileBtn} onClick={onGoToProfileClick}>
				<img className={style.personIcon} src={person} alt='person' />
				Profile
			</UniversalButton>
			<UniversalButton className={style.logOutBtn} onClick={onLogOutClick}>
				<img className={style.logOutIcon} src={logOutIcon} alt='log out' />
				Log Out
			</UniversalButton>
		</div>
	)
}
