import {Reducer} from 'redux'
import {valueType, funMode, MainData, getExtremun, getMidleValue} from '../utils/mainData'
// import {promisifySyncFun} from '../utils/lilteUtils'
import {AppAction} from '.'

export class TableDataActionT {
  static GET_POINTS_EXTREMUM = 'GET_POINTS_EXTREMUM' as const
  static GET_MID_VALUE = 'GET_MID_VALUE' as const 
  static GET_ABSOLUTE_EXTREMUM = 'GET_ABSOLUTE_EXTREMUM' as const
  static SHOW_LOADING = 'SHOW_LOADING' as const
  static SET_PERIOD = 'SET_PERIOD' as const 
  static CALCULATE = 'CALCULATE' as const
}

type TableDataType = {
  value: number,
  date: string,
  point: string,
}

export class TableDataAction {

  static createGetPointsExtremum = (extremum: Extremums) =>
    ({ type: TableDataActionT.GET_POINTS_EXTREMUM, pyload: extremum})

  static createMidValue = (mid: TableDataType, type: valueType) =>
    ({ type: TableDataActionT.GET_MID_VALUE, pyload: {mid, type} })
  
  static createAbsoluteExtrmum = (value: TableDataType, type: valueType, mode: funMode) =>
    ({ type: TableDataActionT.GET_ABSOLUTE_EXTREMUM, pyload: {value, type, mode} })
  
  static createShowLoading = (show: boolean) =>
    ({ type: TableDataActionT.SHOW_LOADING, pyload: show })

  static createSetPeriod = (value: number, type: 'start' | 'end') =>
    ({ type: TableDataActionT.SET_PERIOD, pyload: {value, type} })
  
  static createCalculate = (
    mainData: MainData, period: {start: number, end: number}, pseudonyms: string[]
  ): AppAction => async dispatch => {
    dispatch(TableDataAction.createShowLoading(true))
    const maxT = getExtremun(mainData, period, 'temperature', 'max', pseudonyms)
    const midT = getMidleValue(mainData, 'temperature', period, pseudonyms)
    const minT = getExtremun(mainData, period, 'temperature', 'min', pseudonyms)
    const maxH = getExtremun(mainData, period, 'humidity', 'max', pseudonyms)
    const midH = getMidleValue(mainData, 'humidity', period, pseudonyms)
    const minH = getExtremun(mainData, period, 'humidity', 'min', pseudonyms)
    const extremums = pseudonyms.reduce((acc, pseudonym) => {
      return {...acc, [pseudonym]: {
        temperature: {
          min: minT[pseudonym],
          mid: midT[pseudonym],
          max: maxT[pseudonym],
        },
        humidity: {
          min: minH[pseudonym],
          mid: midH[pseudonym],
          max: maxH[pseudonym],
        }
      }}
    }, {} as Extremums)
    dispatch(TableDataAction.createGetPointsExtremum(extremums))
    dispatch(TableDataAction.createShowLoading(false))
  }
}

type Action = 
  | ReturnType<typeof TableDataAction.createGetPointsExtremum>
  | ReturnType<typeof TableDataAction.createMidValue>
  | ReturnType<typeof TableDataAction.createShowLoading>
  | ReturnType<typeof TableDataAction.createAbsoluteExtrmum>
  | ReturnType<typeof TableDataAction.createSetPeriod>

type Extremums = {[point: string]: {
  temperature: {
    min: {value: number, date: string},
    mid: {value: number, date: string},
    max: {value: number, date: string},
  },
  humidity: {
    min: {value: number, date: string},
    mid: {value: number, date: string},
    max: {value: number, date: string},
  },
}}
const initState = {
  extremums: {} as Extremums,
  absExtremum: {} as {
    temperature: {
      min: {value: number, date: string[], point: string[]},
      mid: {value: number, date: string[], point: string[]},
      max: {value: number, date: string[], point: string[]},
    },
    humidity: {
      min: {value: number, date: string[], point: string[]},
      mid: {value: number, date: string[], point: string[]},
      max: {value: number, date: string[], point: string[]},
    },
  },
  period: {
    start: 0,
    end: 0,
  },
  loading: false,
}

type tableDataState = typeof initState

export const dateTableReduser: Reducer<tableDataState, Action> = (state=initState, action) => {
  switch (action.type) {
    case TableDataActionT.SET_PERIOD:
      return {...state, period: {...state.period, [action.pyload.type]: action.pyload.value}}
    case TableDataActionT.GET_POINTS_EXTREMUM:
      return {...state, extremums: action.pyload}
    case TableDataActionT.SHOW_LOADING:
      return {...state, loading: action.pyload}
    default:
      return state
  }
}