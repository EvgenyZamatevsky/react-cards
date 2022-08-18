export enum Path {
	LOGIN = '/login',
	REGISTER = '/register',
	FORGOT = '/forgot',
	CHECK_EMAIL = '/check-email',
	NEW_PASSWORD = '/new-password',
	HOME = '/',
	PROFILE = '/profile',
	PACKS = '/packs',
	CARDS = '/cards',
	LEARN = '/learn',
	NOT_FOUND = '*',
	NOT_FOUND_404 = '/404',

	CHECK_EMAIL_PARAMS = '/check-email/:email',
	NEW_PASSWORD_PARAMS = '/new-password/:token',
	CARDS_PARAMS = '/cards/:packId',
	LEARN_PARAMS = '/learn/:packId',
}
