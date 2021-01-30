import {combineReducers, AnyAction} from 'redux'
import {ThunkAction} from 'redux-thunk'
import {loadPageReduser} from './loadingFileReduser'

export const rootReduser = combineReducers({
  loadingPage: loadPageReduser,
})

export type AppState = ReturnType<typeof rootReduser>

export type AppAction = ThunkAction<void, AppState, never, AnyAction>