import {Reducer} from 'redux'

export class chart3dTActionT {
  static ADD_3D_CHART = 'ADD_3D_CHART_T' as const
  static SET_TIME = 'SET_TIME_3D_T' as const
  static SELECT_DATA = 'SELECT_3D_DATA' as const
  static SET_EXTREMUM = 'SET_EXTREMUM_3D' as const
  static GET_3D_CHART_DATA = 'GET_3D_CHART_DATA_T' as const
}

export class chart3dTAction {

  static createAdd3dChart = (time: number) =>
    ({ type: chart3dTActionT.ADD_3D_CHART, pyload: time })

}


const initState = {
  charts3D: [] as {
    time: number,
    selectData: 'time' | 'extrmum',
    extrmum: 'min' | 'mid' | 'max',
    chart3dData: any,
  }[]
}