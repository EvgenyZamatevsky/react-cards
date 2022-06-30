import React, { ChangeEvent, FC, memo, useState } from 'react'
import { ReturnComponentType } from 'types'
import avatar from 'assets/images/avatar.svg'
import style from './ProfileEdit.module.scss'
import { useTypedDispatch } from 'store/hooks'
import { updateUserTC } from 'store/middlewares'

export type ProfileEditPropsType = {
	setEditProfile: (editProfile: boolean) => void
	userAvatar?: string
	initialNickname?: string
	initialImageUrl?: string
}

export const ProfileEdit: FC<ProfileEditPropsType> = memo(
	({ setEditProfile, userAvatar, initialNickname, initialImageUrl }): ReturnComponentType => {

		const dispatch = useTypedDispatch()

		const [nickname, setNickname] = useState(initialNickname)
		const [imageUrl, setImageUrl] = useState(initialImageUrl)

		const onNicknameChange = (e: ChangeEvent<HTMLInputElement>) => {
			setNickname(e.currentTarget.value)
		}

		const onImageUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
			setImageUrl(e.currentTarget.value)
		}

		const onDeactivateEditProfileClick = () => {
			setEditProfile(false)
		}

		const onUpdateUserClick = () => {
			dispatch(updateUserTC({ name: nickname, avatar: imageUrl }))
			onDeactivateEditProfileClick()
		}

		return (
			<div className={style.profileEdit}>
				<div className={style.content}>
					<h2 className={style.title}>Personal Information</h2>
					<img className={style.userImage} src={userAvatar ? userAvatar : avatar} />
					<div className={style.body}>
						<input
							className={style.nickname}
							type='text'
							placeholder='Nickname'
							value={nickname}
							onChange={onNicknameChange}
						/>
						<input
							className={style.image}
							type='text'
							placeholder='Image URL'
							value={imageUrl}
							onChange={onImageUrlChange} />
					</div>
					<div className={style.buttons}>
						<button className={style.cancel} onClick={onDeactivateEditProfileClick}>Cancel</button>
						<button className={style.save} onClick={onUpdateUserClick}>Save</button>
					</div>
				</div>
			</div>
		)
	})
