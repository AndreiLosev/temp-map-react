import {combineReducers, AnyAction} from 'redux'
import {ThunkAction} from 'redux-thunk'
import {loadPageReduser} from './loadingFileReduser'
import {dateTableReduser} from './tableDataReduser'
import {chartReduser} from './chartTReduser'
import {chartHReduser} from './chartHReduser'

export const rootReduser = combineReducers({
  loadingPage: loadPageReduser,
  tableData: dateTableReduser,
  tempCharts: chartReduser,
  humCharts: chartHReduser,
})

export type AppState = ReturnType<typeof rootReduser>

export type AppAction = ThunkAction<void, AppState, never, AnyAction>