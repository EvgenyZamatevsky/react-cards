export type UpdateUserType = {
	name?: string
	avatar?: string
}

export type LoginDataType = {
	email: string
	password: string
	rememberMe: boolean
}

export type RegisterDataType = {
	email: string
	password: string
}

export type UserDataType = {
	_id: string
	__v: number
	email: string
	name: string
	avatar?: string
	publicCardPacksCount: number // количество колод 
	created: Date
	updated: Date
	isAdmin: boolean
	verified: boolean // подтвердил ли почту 
	rememberMe: boolean
	error?: string
}

export type ForgotResponseType = {
	answer: boolean
	html: boolean
	info: string
	success: boolean
}

export type NewPasswordDataType = {
	password: string
	resetPasswordToken: string
}

export type LogOutResponseType = {
	info: string,
	error?: string
}

export type NewPasswordResponseType = LogOutResponseType