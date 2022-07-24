import React, { FC, ReactElement } from 'react'
import style from './NotFound.module.scss'

export const NotFound: FC = (): ReactElement => <h1 className={style.notFound}>404 page not found</h1>
