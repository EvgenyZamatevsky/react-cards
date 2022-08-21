import React, { ChangeEvent, FC, useRef } from 'react'
import { ReturnComponentType } from 'types'
import { useAppDispatch } from 'hooks'
import { useSelector } from 'react-redux'
import { updateAuthorizedUserNameOrAvatar } from 'store/asyncActions'
import { selectIsAvatarBroken, selectAuthorizedUserAvatar, selectIsDisabled } from 'store/selectors'
import { setErrorMessage, setIsAvatarBroken } from 'store/slices'
import { InputFilePropsType } from './types'
import defaultAvatar from 'assets/images/defaultAvatar.png'
import selectFile from 'assets/icons/selectFile.svg'
import style from './InputFile.module.scss'
import { UniversalButton } from 'components/common/universalButton'

const MAX_FILE_SIZE = 100000
const FIRST_FILES_INDEX = 0

export const InputFile: FC<InputFilePropsType> = (): ReturnComponentType => {

	const dispatch = useAppDispatch()

	const isAvatarBroken = useSelector(selectIsAvatarBroken)
	const authorizedUserAvatar = useSelector(selectAuthorizedUserAvatar)
	const isDisabled = useSelector(selectIsDisabled)

	const inputRef = useRef<HTMLInputElement>(null)

	const onSelectFileClick = (): void => inputRef && inputRef.current?.click()

	const onUploadFileChange = (event: ChangeEvent<HTMLInputElement>): void => {
		if (event.currentTarget.files && event.currentTarget.files.length) {
			const file = event.currentTarget.files[FIRST_FILES_INDEX]

			if (file.size < MAX_FILE_SIZE) {
				convertFileToBase64(file, (file64: string) => {
					dispatch(updateAuthorizedUserNameOrAvatar({ avatar: file64 }))
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
				className={style.avatarImg}
				src={isAvatarBroken ? defaultAvatar : authorizedUserAvatar}
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
				<UniversalButton onClick={onSelectFileClick} disabled={isDisabled}>
					<img className={style.selectFileImg} src={selectFile} alt='selectFile' />
				</UniversalButton>
			</label>
		</div>
	)
}
