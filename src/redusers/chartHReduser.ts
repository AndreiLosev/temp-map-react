import {Reducer} from 'redux'

export class chartHActionT {
  static ADD_CHART = 'ADD_CHART_H' as const
  static SET_PERIOD = 'SET_PERIOD_H' as const
  static GET_CHART_DATA = 'GET_CHART_DATA_H' as const
  static UPDATE_POINTS = 'UPDATE_POINTS_H' as const
  static SET_STEP = 'SET_STEP_H' as const
}

export class chartHAction {
  static createAddChart = (period: {start: number, end: number}, points: {[point: string]: string}) =>
    ({ type: chartHActionT.ADD_CHART, pyload: {period, points} })

  static createSetPeriod = (value: number, type: 'start' | 'end', index: number) =>
    ({ type: chartHActionT.SET_PERIOD, pyload: {value, type, index} })
  
  static createGetChaerData = (chartData: {x: string[], y: number[], name: string}[], index: number) =>
    ({ type: chartHActionT.GET_CHART_DATA, pyload:  {chartData, index}})
  

  static createSetStep = (step: number, index: number) =>
    ({ type: chartHActionT.SET_STEP, pyload: {step, index} })

  static createUpdatePoints = (points: {[point: string]: string}, index: number) =>
    ({ type: chartHActionT.UPDATE_POINTS, pyload: {points, index} })
}

type Action = 
  | ReturnType<typeof chartHAction.createAddChart>
  | ReturnType<typeof chartHAction.createSetPeriod>
  | ReturnType<typeof chartHAction.createGetChaerData>
  | ReturnType<typeof chartHAction.createUpdatePoints>
  | ReturnType<typeof chartHAction.createSetStep>

const initState = {
  charts: [] as {
    period: {start: number, end: number},
    step: number,
    points: {[point: string] :string},
    chartData: {x: string[], y: number[], name: string}[],
  }[],
}

type ChartHState = typeof initState

export const chartHReduser: Reducer<ChartHState, Action> = (state=initState, action) => {
  switch (action.type) {
    case chartHActionT.ADD_CHART:
      const newCharts = state.charts.concat([{
        period: action.pyload.period,
        points: action.pyload.points,
        chartData: [],
        step: 15,
      }])
      return {...state, charts: newCharts}
    case chartHActionT.SET_PERIOD:
      return {...state, charts: state.charts.map((item, i) => {
        if (i === action.pyload.index)
          return {...item, period: {...item.period, [action.pyload.type]: action.pyload.value}}
        return item
      })}
    case chartHActionT.GET_CHART_DATA:
      return {...state, charts: state.charts.map((item, i) => {
        if (i === action.pyload.index)
          return {...item, chartData: action.pyload.chartData}
        return item
      })}
    case chartHActionT.SET_STEP:
      return {...state, charts: state.charts.map((item, i) => {
        if (i === action.pyload.index) 
          return {...item, step: action.pyload.step > 1 ? action.pyload.step : 1}
        return item
      })}
    case chartHActionT.UPDATE_POINTS:
      return {...state, charts: state.charts.map((item, i) => {
        if (i === action.pyload.index)
          return {...item, points: action.pyload.points}
        return item
      })}
    default:
      return state
  }
}