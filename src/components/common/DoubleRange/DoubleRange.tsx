import React, { FC } from 'react'
import { useRanger } from 'react-ranger'
import { ReturnComponentType } from 'types'

export type DoubleRangePropsType = {
	handleChangedCardsCountMouseUp: ({ min, max }: { min: number, max: number }) => void
	min: number
	max: number
}

export const DoubleRange: FC<DoubleRangePropsType> = ({ handleChangedCardsCountMouseUp, min, max }): ReturnComponentType => {

	const [values, setValues] = React.useState([min, max])

	const { getTrackProps, handles } = useRanger({
		min: 0,
		max: 110,
		stepSize: 1,
		values,
		onChange: setValues,
	})

	const onChangedCardsCountMouseUp = () => {
		handleChangedCardsCountMouseUp({ min: values[0], max: values[1] })
	}

	return (
		<div>
			<div
				{...getTrackProps({
					style: {
						height: "4px",
						background: "#ddd",
						boxShadow: "inset 0 1px 2px rgba(0,0,0,.6)",
						borderRadius: "2px"
					}
				})}
				onClick={onChangedCardsCountMouseUp}
			>
				{handles.map(({ getHandleProps }) => (
					<button
						{...getHandleProps({
							style: {
								width: "14px",
								height: "14px",
								outline: "none",
								borderRadius: "100%",
								background: "linear-gradient(to bottom, #eee 45%, #ddd 55%)",
								border: "solid 1px #888"
							}
						})}
					/>
				))}
			</div>
		</div>
	)
}
