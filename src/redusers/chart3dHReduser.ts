import {Reducer} from 'redux'
import {getChart3dData} from '../utils/mainData'

export class chart3dHActionT {
  static ADD_3D_CHART = 'ADD_3D_CHART_H' as const
  static SET_TIME = 'SET_TIME_3D_H' as const
  static SELECT_DATA = 'SELECT_3D_DATA_H' as const
  static SET_EXTREMUM = 'SET_EXTREMUM_3D_H' as const
  static GET_3D_CHART_DATA = 'GET_3D_CHART_DATA_H' as const
}

export class chart3dTHAction {

  static createAdd3dChart = (time: number) =>
    ({ type: chart3dHActionT.ADD_3D_CHART, pyload: time })

  static createSetExtremum = (mode: 'min' | 'mid' | 'max', index: number) =>
    ({ type: chart3dHActionT.SET_EXTREMUM, pyload: {mode, index} })

  static createSelectData = (data: 'time' | 'extrmum', index: number) =>
    ({ type: chart3dHActionT.SELECT_DATA, pyload: {data, index} })  

  static createSetTime = (dateTime: number, index: number) =>
    ({ type: chart3dHActionT.SET_TIME, pyload: {dateTime, index} })

  static createGet3dChartData = (chart3dData: ReturnType<typeof getChart3dData>, index: number) => ({
    type: chart3dHActionT.GET_3D_CHART_DATA,
    pyload: {chart3dData, index},
  })
}

type Action =
| ReturnType<typeof chart3dTHAction.createAdd3dChart>
| ReturnType<typeof chart3dTHAction.createSetExtremum>
| ReturnType<typeof chart3dTHAction.createSelectData>
| ReturnType<typeof chart3dTHAction.createSetTime>
| ReturnType<typeof chart3dTHAction.createGet3dChartData>

const initState = {
  charts3D: [] as {
    time: number,
    selectData: 'time' | 'extrmum',
    extrmum: 'min' | 'mid' | 'max',
    chart3dData: ReturnType<typeof getChart3dData>,
  }[]
}

type Chart3dState = typeof initState

export const chart3dHReduser: Reducer<Chart3dState, Action> = (state=initState, action) => {
  switch (action.type) {
    case chart3dHActionT.ADD_3D_CHART:
      const newCharts3D = [...state.charts3D, {
        time: action.pyload,
        selectData: 'extrmum' as 'time' | 'extrmum',
        extrmum: 'min' as 'min' | 'mid' | 'max',
        chart3dData: {
          positionData: {
            x: [0], y: [0], z: [0], text: ['']
          },
          colorsValuesMap: new Map<number, string>()
        } as ReturnType<typeof getChart3dData>,
      }]
      return {...state, charts3D: newCharts3D}
    case chart3dHActionT.SET_EXTREMUM:
      return {...state, charts3D: state.charts3D.map((item, i) => {
        if (i === action.pyload.index) return {...item, extrmum: action.pyload.mode}
        else return item
      })}
    case chart3dHActionT.GET_3D_CHART_DATA:
      return {...state, charts3D: state.charts3D.map((item, i) => {
        if (i === action.pyload.index) return {...item, chart3dData: action.pyload.chart3dData}
        else return item
      })}
    case chart3dHActionT.SELECT_DATA:
      return {...state, charts3D: state.charts3D.map((item, i) => {
        if(i === action.pyload.index) return {...item, selectData: action.pyload.data}
        else return item
      })}
    case chart3dHActionT.SET_TIME:
      return {...state, charts3D: state.charts3D.map((item, i) => {
        if (i === action.pyload.index) return {...item, time: action.pyload.dateTime}
        else return item
      })}
    default:
      return state
  }
}