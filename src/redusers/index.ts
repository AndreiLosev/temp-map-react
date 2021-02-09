import {combineReducers, AnyAction} from 'redux'
import {ThunkAction} from 'redux-thunk'
import {loadPageReduser} from './loadingFileReduser'
import {dateTableReduser} from './tableDataReduser'
import {chartReduser} from './chartTReduser'

export const rootReduser = combineReducers({
  loadingPage: loadPageReduser,
  tableData: dateTableReduser,
  tempCharts: chartReduser,
})

export type AppState = ReturnType<typeof rootReduser>

export type AppAction = ThunkAction<void, AppState, never, AnyAction>