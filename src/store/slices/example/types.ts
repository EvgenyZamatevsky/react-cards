export type ExampleSliceInitialStateType = {
	isLoading: boolean,
	items: SupplementedItemType[]
}

export type SupplementedItemType = ItemType & {
	isDisabled: boolean
}

export type ItemType = {
	id: number
	title: string
	isActive: boolean
	filter: FilterValue
}

export enum FilterValue {
	ALL = 'all',
	ACTIVE = 'active',
	COMPLETED = 'completed'
} 
