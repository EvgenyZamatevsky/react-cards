import React, { FC } from 'react'
import { ReturnComponentType } from 'types'
import style from './Search.module.scss'
import loon from 'assets/icons/loon.svg'
import cross from 'assets/icons/cross.svg'

type SearchPropsType = {

}

export const Search: FC<SearchPropsType> = (): ReturnComponentType => {
	return (
		<div className={style.search}>
			<img className={style.searchIcon} src={loon} />
			<input className={style.searchInput} placeholder='Search' />
			{3 > 2 && <img className={style.clearIcon} src={cross} alt='cross' />}
		</div>
	)
}
