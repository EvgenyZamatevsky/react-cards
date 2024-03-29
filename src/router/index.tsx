import { Path } from 'enums'
import { RequireAuth } from 'hocs'
import { Profile } from 'pages'
import { lazy } from 'react'
import { Navigate } from 'react-router-dom'

const NotFound = lazy(() => import(/* webpackChunkName: 'NotFound' */'pages/notFound')
	.then(module => ({ default: module.NotFound })))

const Login = lazy(() => import(/* webpackChunkName: 'Login' */'pages/login')
	.then(module => ({ default: module.Login })))

const Register = lazy(() => import(/* webpackChunkName: 'Register' */'pages/register')
	.then(module => ({ default: module.Register })))

const Forgot = lazy(() => import(/* webpackChunkName: 'Forgot' */'pages/forgot')
	.then(module => ({ default: module.Forgot })))

const CheckEmail = lazy(() => import(/* webpackChunkName: 'CheckEmail' */'pages/checkEmail')
	.then(module => ({ default: module.CheckEmail })))

const NewPassword = lazy(() => import(/* webpackChunkName: 'NewPassword' */'pages/newPassword')
	.then(module => ({ default: module.NewPassword })))

const Packs = lazy(() => import(/* webpackChunkName: 'Packs' */'pages/packs')
	.then(module => ({ default: module.Packs })))

const Cards = lazy(() => import(/* webpackChunkName: 'Cards' */'pages/cards')
	.then(module => ({ default: module.Cards })))

const Learn = lazy(() => import(/* webpackChunkName: 'Learn' */'pages/learn')
	.then(module => ({ default: module.Learn })))

export const ROUTES = [
	{ path: Path.HOME, element: <Navigate to={Path.PROFILE} /> },
	{ path: Path.PROFILE, element: <RequireAuth><Profile /></RequireAuth> },
	{ path: Path.PACKS, element: <RequireAuth><Packs /></RequireAuth> },
	{ path: Path.LOGIN, element: <Login /> },
	{ path: Path.REGISTER, element: <Register /> },
	{ path: Path.FORGOT, element: <Forgot /> },
	{ path: `${Path.CARDS}/:packId`, element: <RequireAuth><Cards /></RequireAuth> },
	{ path: `${Path.CHECK_EMAIL}/:email`, element: <CheckEmail /> },
	{ path: `${Path.NEW_PASSWORD}/:token`, element: <NewPassword /> },
	{ path: `${Path.LEARN}/:packId`, element: <RequireAuth><Learn /></RequireAuth> },
	{ path: Path.NOT_FOUND_404, element: <NotFound /> },
	{ path: Path.NOT_FOUND, element: <Navigate to={Path.NOT_FOUND_404} /> },
]
