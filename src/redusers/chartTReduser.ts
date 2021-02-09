import {Reducer} from 'redux'

export class chartActionT {
  static ADD_CHART = 'ADD_CHART' as const
  static SET_PERIOD = 'SET_PERIOD' as const
  static GET_CHART_DATA = 'GET_CHART_DATA' as const
  static UPDATE_POINTS = 'UPDATE_POINTS' as const
  static SET_STEP = 'SET_STEP' as const
}

export class chartAction {
  static createAddChart = (period: {start: number, end: number}, points: string[]) =>
    ({ type: chartActionT.ADD_CHART, pyload: {period, points} })

  static createSetPeriod = (value: number, type: 'start' | 'end', index: number) =>
    ({ type: chartActionT.SET_PERIOD, pyload: {value, type, index} })
  
  static createGetChaerData = (chartData: {x: string[], y: number[], name: string}[], index: number) =>
    ({ type: chartActionT.GET_CHART_DATA, pyload:  {chartData, index}})
  

  static createSetStep = (step: number, index: number) =>
    ({ type: chartActionT.SET_STEP, pyload: {step, index} })

  static createUpdatePoints = (points: string[], index: number) =>
    ({ type: chartActionT.UPDATE_POINTS, pyload: {points, index} })
}

type Action = 
  | ReturnType<typeof chartAction.createAddChart>
  | ReturnType<typeof chartAction.createSetPeriod>
  | ReturnType<typeof chartAction.createGetChaerData>
  | ReturnType<typeof chartAction.createUpdatePoints>
  | ReturnType<typeof chartAction.createSetStep>

const initState = {
  charts: [] as {
    period: {start: number, end: number},
    step: number,
    points: string[],
    chartData: {x: string[], y: number[], name: string}[],
  }[],
}

type ChaetState = typeof initState

export const chartReduser: Reducer<ChaetState, Action> = (state=initState, action) => {
  switch (action.type) {
    case chartActionT.ADD_CHART:
      const newCharts = state.charts.concat([{
        period: action.pyload.period,
        points: action.pyload.points,
        chartData: [],
        step: 15,
      }])
      return {...state, charts: newCharts}
    case chartActionT.SET_PERIOD:
      return {...state, charts: state.charts.map((item, i) => {
        if (i === action.pyload.index)
          return {...item, period: {...item.period, [action.pyload.type]: action.pyload.value}}
        return item
      })}
    case chartActionT.GET_CHART_DATA:
      return {...state, charts: state.charts.map((item, i) => {
        if (i === action.pyload.index)
          return {...item, chartData: action.pyload.chartData}
        return item
      })}
    case chartActionT.SET_STEP:
      return {...state, charts: state.charts.map((item, i) => {
        if (i === action.pyload.index) 
          return {...item, step: action.pyload.step > 5 ? action.pyload.step : 5}
        return item
      })}
    case chartActionT.UPDATE_POINTS:
      return {...state, charts: state.charts.map((item, i) => {
        if (i === action.pyload.index)
          return {...item, points: action.pyload.points}
        return item
      })}
    default:
      return state
  }
}