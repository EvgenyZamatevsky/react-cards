import { Card, Search, Sort } from 'components'
import { Path } from 'enums'
import React, { FC, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getCards } from 'store/asyncActions/cards'
import { useAppDispatch } from 'store/hooks'
import { selectAuthorizedUserData, selectCards } from 'store/selectors'
import { ReturnComponentType } from 'types'
import arrow from 'assets/icons/arrow.svg'
import style from './Cards.module.scss'

type CardsPropsType = {

}

export const Cards: FC<CardsPropsType> = (): ReturnComponentType => {

	const cards = useSelector(selectCards)

	const cardsRender = cards.map(({ question, answer, updated, grade }) => {
		return <Card question={question} answer={answer} updated={updated} grade={grade} />
	})

	return (
		<div className={style.container}>
			<Link to={Path.PACKS} className={style.backToPacksListBtn}>
				<img src={arrow} alt='arrow' />
				<div>Back to Packs List</div>
			</Link>

			<div className={style.top}>
				<h2 className={style.title}>Packs list</h2>
			</div>
			<div className={style.main}>
				<Search />
				<button className={style.addNewPackBtn} onClick={() => { }}>Add new card</button>
			</div>
			<div className={style.bottom}>
				<Sort />
			</div>
			{cardsRender}
		</div>
	)
}
