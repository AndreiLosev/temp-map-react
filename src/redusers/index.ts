import {combineReducers, AnyAction} from 'redux'
import {ThunkAction} from 'redux-thunk'
import {loadPageReduser} from './loadingFileReduser'
import {dateTableReduser} from './tableDataReduser'
import {chartReduser} from './chartTReduser'
import {chartHReduser} from './chartHReduser'
import {chart3DReduser} from './chart3dTReduser'
import {chart3dHReduser} from './chart3dHReduser'

export const rootReduser = combineReducers({
  loadingPage: loadPageReduser,
  tableData: dateTableReduser,
  tempCharts: chartReduser,
  humCharts: chartHReduser,
  temp3dCharts: chart3DReduser,
  hum3dCharts: chart3dHReduser,
})

export type AppState = ReturnType<typeof rootReduser>

export type AppAction = ThunkAction<void, AppState, never, AnyAction>