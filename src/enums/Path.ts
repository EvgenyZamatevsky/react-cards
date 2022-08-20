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

	CHECK_EMAIL_PARAM = '/check-email/:email',
	NEW_PASSWORD_PARAM = '/new-password/:token',
	CARDS_PARAM = '/cards/:packId',
	LEARN_PARAM = '/learn/:packId',
}
