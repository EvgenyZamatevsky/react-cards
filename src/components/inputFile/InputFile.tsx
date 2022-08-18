import React, { ChangeEvent, FC, useRef } from 'react'
import { updateAuthorizedUser } from 'store/asyncActions'
import { useAppDispatch } from 'store/hooks'
import { setErrorMessage, setIsAvatarBroken } from 'store/slices'
import { ReturnComponentType } from 'types'
import defaultAvatar from 'assets/images/defaultAvatar.png'
import selectFile from 'assets/icons/selectFile.svg'
import { InputFilePropsType } from './types'
import { useSelector } from 'react-redux'
import { selectIsAvatarBroken } from 'store/selectors'
import style from './InputFile.module.scss'

export const InputFile: FC<InputFilePropsType> = ({ avatarAuthorizedUser }): ReturnComponentType => {

	const dispatch = useAppDispatch()

	const isAvatarBroken = useSelector(selectIsAvatarBroken)

	const inputRef = useRef<HTMLInputElement>(null)

	const onSelectFileClick = (): void => inputRef && inputRef.current?.click()

	const onUploadFileChange = (event: ChangeEvent<HTMLInputElement>): void => {
		if (event.target.files && event.target.files.length) {
			const file = event.target.files[0]

			if (file.size < 100000) {
				convertFileToBase64(file, (file64: string) => {
					dispatch(updateAuthorizedUser({ avatar: file64 }))
				})
			} else {
				dispatch(setErrorMessage('The file is too large!'))
			}
		}
	}

	const convertFileToBase64 = (file: File, callBack: (value: string) => void): void => {
		const reader = new FileReader()
		reader.onloadend = () => {
			const file64 = reader.result as string
			callBack(file64)
		}
		reader.readAsDataURL(file)
	}

	const onImgError = (): void => {
		dispatch(setIsAvatarBroken(true))
		dispatch(setErrorMessage('Curve picture'))
	}

	return (
		<div className={style.container}>
			<img
				className={style.avatar}
				src={isAvatarBroken ? defaultAvatar : avatarAuthorizedUser}
				alt='avatar'
				onError={onImgError}
			/>

			<label className={style.label}>
				<input
					className={style.file}
					ref={inputRef}
					type='file'
					onChange={onUploadFileChange}
				/>
				<button onClick={onSelectFileClick}>
					<img className={style.selectFileImg} src={selectFile} alt='selectFile' />
				</button>
			</label>
		</div>
	)
}
