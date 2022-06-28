import { useDispatch } from 'react-redux'
import { DispatchType } from './types'

export const useTypedDispatch = () => useDispatch<DispatchType>()
