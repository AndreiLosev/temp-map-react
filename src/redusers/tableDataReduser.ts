import {Reducer} from 'redux'

export class TableDataActionT {
  static GET_POINTS_EXTREMUM = 'GET_POINTS_EXTREMUM' as const
  static GET_MID_VALUE = 'GET_MID_VALUE' as const 
  static GET_ABSOLUTE_EXTREMUM = 'GET_ABSOLUTE_EXTREMUM' as const
  static SHOW_LOADING = 'SHOW_LOADING' as const
  static SET_PERIOD = 'SET_PERIOD' as const
}

type TableDataType = {
  value: number,
  date: string,
  point: string,
}

type valueType = 'temperature' | 'humidity'
type funMode = 'max' | 'min' | 'mid'

export class TableDataAction {

  static createGetPointsExtremum = (extremum: TableDataType[], type: valueType, mode: funMode) =>
    ({ type: TableDataActionT.GET_POINTS_EXTREMUM, pyload: {extremum, type, mode} })

  static createMidValue = (mid: TableDataType, type: valueType) =>
    ({ type: TableDataActionT.GET_MID_VALUE, pyload: {mid, type} })
  
  static createAbsoluteExtrmum = (value: TableDataType, type: valueType, mode: funMode) =>
    ({ type: TableDataActionT.GET_ABSOLUTE_EXTREMUM, pyload: {value, type, mode} })
  
  static createShowLoading = (show: boolean) =>
    ({ type: TableDataActionT.SHOW_LOADING, pyload: show })

  static createSetPeriod = (start: number, end: number) =>
    ({ type: TableDataActionT.SET_PERIOD, pyload: {start, end} })
}

type Action = 
  | ReturnType<typeof TableDataAction.createGetPointsExtremum>
  | ReturnType<typeof TableDataAction.createMidValue>
  | ReturnType<typeof TableDataAction.createShowLoading>
  | ReturnType<typeof TableDataAction.createAbsoluteExtrmum>
  | ReturnType<typeof TableDataAction.createSetPeriod>


const initState = {
  extremums: {} as {[point: string]: {
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
  }},
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
  }
}

type tableDataState = typeof initState

export const dateTableReduser: Reducer<tableDataState, Action> = (state=initState, action) => {
  switch (action.type) {
    case TableDataActionT.SET_PERIOD:
      return {...state, period: action.pyload}
    default:
      return state
  }
}