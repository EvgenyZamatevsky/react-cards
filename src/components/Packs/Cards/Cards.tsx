import { Path } from 'enums'
import { useTypedDispatch } from 'hooks'
import React, { FC, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useParams } from 'react-router-dom'
import { selectIsAuth } from 'store/authReducer/selectors'
import { selectCards } from 'store/cardsReducer/selectors'
import { getCardsTC } from 'store/cardsReducer/thunks'
import { ReturnComponentType } from 'types'
import { Card } from '../Card/Card'
import style from './Cards.module.scss'

export type CardsPropsType = {

}

export const Cards: FC<CardsPropsType> = (): ReturnComponentType => {

	const dispatch = useTypedDispatch()

	const isAuth = useSelector(selectIsAuth)
	const cards = useSelector(selectCards)

	const params = useParams()

	const renderCards = cards.map(card => <Card key={card._id} card={card} />)

	useEffect(() => {
		if (isAuth) {
			dispatch(getCardsTC(params.cardId as string))
		}
	}, [])

	if (!isAuth) {
		return <Navigate to={Path.login} />
	}

	return (
		<div className={style.cards}>
			<div className={style.container}>
				<input className={style.search} type="text" />
				<div className={style.table}>
					<div className={style.info}>
						<button className={style.infoName} >Question</button>
						<button className={style.infoCards} >Answer</button>
						<button className={style.infoLastUpdated}>Last Updated</button>
						<button className={style.infoCreatedBy} >Grade</button>
					</div>
					{renderCards}
				</div>
			</div>
		</div>
	)
}
