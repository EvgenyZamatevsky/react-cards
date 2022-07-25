export enum Path {
	LOGIN = '/login',
	REGISTER = '/register',
	FORGOT = '/forgot',
	CHECK_EMAIL = '/check-email/:email',
	NEW_PASSWORD = '/new-password/:token',
	HOME = '/',
	PROFILE = '/profile',
	PACKS = '/packs',
	NOT_FOUND = '*'
}
