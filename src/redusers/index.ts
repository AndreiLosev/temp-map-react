import {combineReducers, AnyAction} from 'redux'
import {ThunkAction} from 'redux-thunk'

export const rootReduser = combineReducers({})

export type TState = ReturnType<typeof rootReduser>

export type AppAction = ThunkAction<void, TState, never, AnyAction>