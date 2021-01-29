import {Reducer} from 'redux'
import {AppAction} from '.'
import {loadFile} from '../utils/loadFiles'
import {MainData, IntDate, getMainData} from '../utils/getMainData'

class LoadingPageActionT {
  static GET_META_DATA = 'GET_META_DATA' as const
  static GET_MAIN_DATA = 'GET_MAIN_DATA' as const
}

export class LoadingPageAction {

  static createGetMetaData = (metaData: FileMetaData[]) =>
    ({ type: LoadingPageActionT.GET_META_DATA, pyload: metaData })
  
  static createMainData = (mainData: MainData) =>
    ({ type: LoadingPageActionT.GET_MAIN_DATA, pyload: mainData })

  static loadAndParseDate = (files: FileList): AppAction => async dispatch => {
    const rafData = await Promise.all(Array.from(files).map(i => loadFile(i)))
    const mainData = getMainData(rafData.map(i => i[1]), rafData.map(i => i[0]))
    dispatch(LoadingPageAction.createMainData(mainData))
    const metaData: FileMetaData[] = Object.keys(mainData).map(point => {
      const dataKeys = Array.from(mainData[point].keys())
      return {
        fileName: point,
        numberOfMeasurements: mainData[point].size,
        startMeasurements: dataKeys[0],
        endMeasurements: dataKeys[dataKeys.length - 1],
        pseudonym: point,
      }
    })
    dispatch(LoadingPageAction.createGetMetaData(metaData))
  }
}

type Action = 
  | ReturnType<typeof LoadingPageAction.createGetMetaData>
  | ReturnType<typeof LoadingPageAction.createMainData>

type FileMetaData = {
  fileName: string,
  numberOfMeasurements: number,
  startMeasurements: IntDate,
  endMeasurements: IntDate,
  pseudonym: string,
} 

const initState = {
  filesMetaData: [] as FileMetaData[],
  mainData: {} as MainData
}

export type LoadPageState = typeof initState


export const  loadPageReduser: Reducer<LoadPageState, Action> = (state=initState, action) => {
  switch (action.type) {
    case LoadingPageActionT.GET_META_DATA:
      return {...state, filesMetaData: action.pyload}
    case LoadingPageActionT.GET_MAIN_DATA:
      return {...state, mainData: action.pyload}
    default:
      return state
  }
}



