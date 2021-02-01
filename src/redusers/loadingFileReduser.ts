import {Reducer} from 'redux'
import {AppAction} from '.'
import {loadFile} from '../utils/loadUpload'
import {MainData, IntDate, getMainData, getPeriod} from '../utils/mainData'

class LoadingPageActionT {
  static GET_META_DATA = 'GET_META_DATA' as const
  static GET_MAIN_DATA = 'GET_MAIN_DATA' as const
  static LOADING = 'LOADING' as const
  static SET_PSEVDONIM = 'SET_PSEVDONIM' as const
  static GET_PERIOD = 'GET_PERIOD' as const
  static REMOVE_DATA_ITEM = 'REMOVE_DATA_ITEM' as const
}

export class LoadingPageAction {

  static createGetMetaData = (metaData: FileMetaData[]) =>
    ({ type: LoadingPageActionT.GET_META_DATA, pyload: metaData })
  
  static createMainData = (mainData: MainData) =>
    ({ type: LoadingPageActionT.GET_MAIN_DATA, pyload: mainData })
  
  static createLoading = (show: boolean) =>
    ({ type: LoadingPageActionT.LOADING, pyload: show })

  static createSetPsevdonim = (str: string, index: number) =>
    ({ type: LoadingPageActionT.SET_PSEVDONIM, pyload: {str, index} })
  
  static createGetPeriod = (start: number, end: number) =>
    ({ type: LoadingPageActionT.GET_PERIOD, pyload: {start, end} })

  static createRemoveDataIemt = (index: number, name: string) =>
    ({ type: LoadingPageActionT.REMOVE_DATA_ITEM, pyload: {index, name} })

  static loadAndParseDate = (files: FileList): AppAction => async dispatch => {
    dispatch(LoadingPageAction.createLoading(true))
    const rafData = await Promise.all(Array.from(files).map(i => loadFile(i)))
    const mainData = getMainData(rafData.map(i => i[1]), rafData.map(i => i[0]))
    const period = getPeriod(mainData)
    dispatch(LoadingPageAction.createGetPeriod(period.start, period.end))
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
    dispatch(LoadingPageAction.createLoading(false))
  }
}

type Action = 
  | ReturnType<typeof LoadingPageAction.createGetMetaData>
  | ReturnType<typeof LoadingPageAction.createMainData>
  | ReturnType<typeof LoadingPageAction.createLoading>
  | ReturnType<typeof LoadingPageAction.createSetPsevdonim>
  | ReturnType<typeof LoadingPageAction.createGetPeriod>
  | ReturnType<typeof LoadingPageAction.createRemoveDataIemt>

type FileMetaData = {
  fileName: string,
  numberOfMeasurements: number,
  startMeasurements: IntDate,
  endMeasurements: IntDate,
  pseudonym: string,
} 

const initState = {
  filesMetaData: [] as FileMetaData[],
  mainData: {} as MainData,
  loading: false,
  period: {
    start: 0,
    end: 0,
  }
}

export type LoadPageState = typeof initState


export const  loadPageReduser: Reducer<LoadPageState, Action> = (state=initState, action) => {
  switch (action.type) {
    case LoadingPageActionT.GET_META_DATA:
      return {...state, filesMetaData: action.pyload}
    case LoadingPageActionT.GET_MAIN_DATA:
      return {...state, mainData: action.pyload}
    case LoadingPageActionT.LOADING:
      return {...state, loading: action.pyload}
    case LoadingPageActionT.SET_PSEVDONIM:
      const newFileMetaData = [...state.filesMetaData]
      newFileMetaData[action.pyload.index].pseudonym = action.pyload.str
      return {...state, filesMetaData: newFileMetaData}
    case LoadingPageActionT.GET_PERIOD:
      return {...state, period: action.pyload}
    case LoadingPageActionT.REMOVE_DATA_ITEM:
      const newFileMetaData1 = state.filesMetaData.filter((_, i) => i !== action.pyload.index)
      const newMainData = {...state.mainData}
      delete(newMainData[action.pyload.name])
      return {...state, mainData: newMainData, filesMetaData: newFileMetaData1}
    default:
      return state
  }
}



