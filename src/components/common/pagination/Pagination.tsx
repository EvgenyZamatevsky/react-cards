import React, { FC, memo, useEffect, useState } from 'react'
import { EMPTY_STRING } from 'constants/base'
import { ReturnComponentType } from 'types/ReturnComponentType'
import { PaginationPropsType } from './types'
import { useSelector } from 'react-redux'
import { selectIsDisabled } from 'store/selectors'
import { UniversalButton } from '../universalButton'
import { UniversalSelect } from '../universalSelect'
import style from './Pagination.module.scss'

const pageCountValues: string[] = ['5', '25', '50', '100']

export const Pagination: FC<PaginationPropsType> =
	memo(({
		totalItemsCount,
		pageCount,
		page,
		handleSetPageClick,
		handleSetPageCountChange,
		portionSize = 10,
	}): ReturnComponentType => {

		const isDisabled = useSelector(selectIsDisabled)

		const [portionNumber, setPortionNumber] = useState(1)

		const pagesCount = Math.ceil(totalItemsCount / pageCount)
		const pages = []
		const portionCount = Math.ceil(pagesCount / portionSize)
		const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
		const rightPortionPageNumber = portionNumber * portionSize

		for (let i = 1; i < pagesCount; i++) {
			pages.push(i)
		}

		useEffect(() => {
			setPortionNumber(Math.ceil(page / portionSize))
		}, [page])

		const onDecreasePortionNumberClick = (): void => setPortionNumber(portionNumber - 1)

		const onIncreasePortionNumberClick = (): void => setPortionNumber(portionNumber + 1)

		const onSelectChange = (value: string): void => {
			handleSetPageCountChange(Number(value))
		}

		return (
			<div className={style.pagination}>

				<div className={style.container}>
					{totalItemsCount >= 11 &&
						<>
							{portionNumber > 1 && <UniversalButton onClick={onDecreasePortionNumberClick} disabled={isDisabled}>&laquo;</UniversalButton>}

							{pages
								.filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
								.map(p => {

									const onSetPageClick = (): void => handleSetPageClick(p)

									return (
										<UniversalButton
											key={p}
											className={page === p ? style.active : EMPTY_STRING}
											onClick={onSetPageClick}
											disabled={isDisabled}
										>
											{p}
										</UniversalButton>
									)
								})}

							{portionCount > portionNumber && <UniversalButton onClick={onIncreasePortionNumberClick} disabled={isDisabled}>&raquo;</UniversalButton>}
						</>}
					{totalItemsCount >= 26 &&
						<div className={style.showContainer}>
							Show
							<UniversalSelect
								className={style.select}
								options={pageCountValues}
								setValue={onSelectChange}
								value={pageCount}
								disabled={isDisabled}
							/>
							Cards per Page
						</div>}
				</div>
			</div>
		)
	})
