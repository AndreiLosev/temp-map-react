import {combineReducers, AnyAction} from 'redux'
import {ThunkAction} from 'redux-thunk'
import {loadPageReduser} from './loadingFileReduser'
import {progresReduser} from './progressBarReduser'

export const rootReduser = combineReducers({
  loadingPage: loadPageReduser,
  progressBar: progresReduser,
})

export type AppState = ReturnType<typeof rootReduser>

export type AppAction = ThunkAction<void, AppState, never, AnyAction>