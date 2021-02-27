import {Reducer} from 'redux'
import {valueType, MainData, getExtremun, getMidleValue, getAbsoluteExtremum} from '../utils/mainData'
// import {promisifySyncFun} from '../utils/lilteUtils'
import {AppAction} from '.'
import { roundIn10 } from '../utils/lilteUtils'

export class TableDataActionT {
  static GET_POINTS_EXTREMUM = 'GET_POINTS_EXTREMUM' as const
  static GET_MID_VALUE = 'GET_MID_VALUE' as const 
  static GET_ABSOLUTE_EXTREMUM = 'GET_ABSOLUTE_EXTREMUM' as const
  static SHOW_LOADING = 'SHOW_LOADING' as const
  static SET_PERIOD = 'SET_PERIOD' as const 
  static CALCULATE = 'CALCULATE' as const
  static SET_POINTS_IN_SPACE = 'SET_POINTS_IN_SPACE' as const 
  static SET_ROOM = 'SET_ROOM' as const
  static SET_DOOR = 'SET_DOOR' as const
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
  
  static createAbsoluteExtrmum = (absExtremum: AbsExtremum) =>
    ({ type: TableDataActionT.GET_ABSOLUTE_EXTREMUM, pyload: absExtremum })
  
  static createShowLoading = (show: boolean) =>
    ({ type: TableDataActionT.SHOW_LOADING, pyload: show })

  static createSetPeriod = (value: number, type: 'start' | 'end') =>
    ({ type: TableDataActionT.SET_PERIOD, pyload: {value, type} })
  
  static createSetPointsInSpace = (dataСube: {[point: string]: {x: number, y: number, z: number}}) =>
    ({ type: TableDataActionT.SET_POINTS_IN_SPACE, pyload: dataСube })

  static createSetRoom = (value: { long: number, width: number, height: number }) =>
    ({ type: TableDataActionT.SET_ROOM, pyload: value })
  
  static createSetDoor = (value: { x1: number, y1: number, z1: number, x2: number, y2: number, z2: number }) =>
    ({ type: TableDataActionT.SET_DOOR, pyload: value })

  static createCalculate = (
    mainData: MainData, period: {start: number, end: number}, pseudonyms: {[point: string]: string}
  ): AppAction => async dispatch => {
    dispatch(TableDataAction.createShowLoading(true))
    const [extremums, absExtremum] = await new Promise<[Extremums, AbsExtremum]>(resilve => {
      setTimeout(() => {
        const maxT = getExtremun(mainData, period, 'temperature', 'max', pseudonyms)
        const midT = getMidleValue(mainData, 'temperature', period, pseudonyms)
        const minT = getExtremun(mainData, period, 'temperature', 'min', pseudonyms)
        const maxH = getExtremun(mainData, period, 'humidity', 'max', pseudonyms)
        const midH = getMidleValue(mainData, 'humidity', period, pseudonyms)
        const minH = getExtremun(mainData, period, 'humidity', 'min', pseudonyms)
        const extremums = Object.values(pseudonyms).reduce((acc, pseudonym) => {
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
        const absMaxT = getAbsoluteExtremum(maxT, 'max')
        const absMidTMax = getAbsoluteExtremum(midT, 'max')
        const absTMid = roundIn10(
          Object.values(midT).reduce((acc, item) => acc + item.value, 0) / Object.values(pseudonyms).length,
        )
        const absMidTmin = getAbsoluteExtremum(midT, 'min')
        const absMinT = getAbsoluteExtremum(minT, 'min')

        const absMaxH = getAbsoluteExtremum(maxH, 'max')
        const absMidHMax = getAbsoluteExtremum(midH, 'max')
        const absHMid = roundIn10(
          Object.values(midH).reduce((acc, item) => acc + item.value, 0) / Object.values(pseudonyms).length,
        )
        const absMidHMin = getAbsoluteExtremum(midH, 'min')
        const absMinH = getAbsoluteExtremum(minH, 'min')
        const absExtremum = {
          temperature: {
            min: absMinT,
            max: absMaxT,
            mid: {
              min: absMidTmin,
              mid: [{value: absTMid, point: 'среднее'}],
              max: absMidTMax,
            }
          },
          humidity: {
            min: absMinH,
            max: absMaxH,
            mid: {
              min: absMidHMin,
              mid: [{value: absHMid, point: 'среднее'}],
              max: absMidHMax,
            }
          },
        }
        resilve([extremums, absExtremum])
      })
    })
    dispatch(TableDataAction.createAbsoluteExtrmum(absExtremum))
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
  | ReturnType<typeof TableDataAction.createSetPointsInSpace>
  | ReturnType<typeof TableDataAction.createSetRoom>
  | ReturnType<typeof TableDataAction.createSetDoor>

export type Extremums = {[point: string]: {
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

export type AbsExtremum = {
  temperature: {
    min: {value: number, date: string, point: string}[],
    mid: {
      min: {value: number, point: string}[],
      mid: {value: number, point: string}[],
      max: {value: number, point: string}[], 
    },
    max: {value: number, date: string, point: string}[],
  },
  humidity: {
    min: {value: number, date: string, point: string}[],
    mid: {
      min: {value: number, point: string}[],
      mid: {value: number, point: string}[],
      max: {value: number, point: string}[], 
    },
    max: {value: number, date: string, point: string}[],
  },
}
const initState = {
  extremums: {} as Extremums,
  absExtremum: {} as AbsExtremum,
  period: {
    start: 0,
    end: 0,
  },
  loading: false,
  dataСube: {} as {[point: string]: {x: number, y: number, z: number}},
  room: { long: 10, width: 10, height: 10 },
  door: { x1: 0, y1: 0, z1: 0, x2: 0, y2: 12, z2: 21 },
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
    case TableDataActionT.GET_ABSOLUTE_EXTREMUM:
      return {...state, absExtremum: action.pyload}
    case TableDataActionT.SET_POINTS_IN_SPACE:
      return {...state, dataСube: action.pyload}
    case TableDataActionT.SET_ROOM:
      return {...state, room: action.pyload}
    case TableDataActionT.SET_DOOR:
      return {...state, door: action.pyload}
    default:
      return state
  }
}