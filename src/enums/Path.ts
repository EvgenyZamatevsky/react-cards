export enum Path {
	LOGIN = '/login',
	REGISTER = '/register',
	FORGOT = '/forgot',
	CHECK_EMAIL_PARAMS = '/check-email/:email',
	CHECK_EMAIL = '/check-email',
	NEW_PASSWORD_PARAMS = '/new-password/:token',
	NEW_PASSWORD = '/new-password',
	HOME = '/',
	PROFILE = '/profile',
	PACKS = '/packs',
	CARDS = '/cards',
	CARDS_PARAMS = '/cards/:packId',
	NOT_FOUND = '*'
}
