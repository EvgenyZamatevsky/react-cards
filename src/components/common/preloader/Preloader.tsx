import React, { FC } from 'react'
import { TailSpin } from 'react-loader-spinner'
import { ReturnComponentType } from 'types'
import style from './Preloader.module.scss'

export const Preloader: FC = (): ReturnComponentType => {
	return <TailSpin color='#EBE0E9' height={200} width={200} wrapperClass={style.preloader} />
}
