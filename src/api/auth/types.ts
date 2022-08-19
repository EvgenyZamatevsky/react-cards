export type AuthorizedUserDataType = {
	_id: string
	email: string
	rememberMe: boolean
	isAdmin: boolean
	name: string
	verified: boolean
	publicCardPacksCount: number
	created: Date
	updated: Date
	__v: number
	token: string
	tokenDeathTime: number
	avatar: string
}

export type UpdatedAuthorizedUserResponseType = {
	token: string
	tokenDeathTime: number
	updatedUser: AuthorizedUserDataType
}
