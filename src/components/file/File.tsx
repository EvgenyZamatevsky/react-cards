import React, { ChangeEvent, FC, memo, useRef } from 'react'
import { ReturnComponentType } from 'types'
import { useAppDispatch } from 'hooks'
import { updateAuthorizedUserNameOrAvatar } from 'store/asyncActions'
import { setErrorMessage } from 'store/slices'
import { FilePropsType } from './types'
import { UniversalButton } from 'components/common/universalButton'
import selectFile from 'assets/icons/selectFile.svg'
import style from './File.module.scss'

const MAX_FILE_SIZE = 100000
const FIRST_FILES_INDEX = 0
const ERROR_MESSAGE = 'The file is too large!'

export const File: FC<FilePropsType> = memo(({ isDisabled }): ReturnComponentType => {

	const dispatch = useAppDispatch()

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
				dispatch(setErrorMessage(ERROR_MESSAGE))
			}
		}
	}

	const convertFileToBase64 = (file: File, callBack: (file64: string) => void): void => {
		const reader = new FileReader()

		reader.onloadend = () => {
			const file64 = reader.result as string
			callBack(file64)
		}

		reader.readAsDataURL(file)
	}

	return (
		<label className={style.label}>
			<input
				className={style.file}
				ref={inputRef}
				type='file'
				onChange={onUploadFileChange}
			/>
			<UniversalButton onClick={onSelectFileClick} disabled={isDisabled}>
				<img className={style.selectFileImg} src={selectFile} alt='select file' />
			</UniversalButton>
		</label>
	)
})
