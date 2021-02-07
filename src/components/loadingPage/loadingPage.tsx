import React from 'react'
import cn from 'classnames'
import {useSelector, useDispatch} from 'react-redux'
import './loadingPage.scss'
import {AppState} from '../../redusers/index'
import { LoadingPageAction } from '../../redusers/loadingFileReduser'
import {LoadingSpiner} from '../loading/loading'
import {csvFromMainData} from '../../utils/loadUpload'
import {ExportToCSV} from '../exportToCSV/exportToCSV'

export const LoadingPage = () => {
  const {loading, filesMetaData, mainData, period} = useSelector((state: AppState) => state.loadingPage)
  const dispatch = useDispatch()
  return <div className={cn('loadingPage')}>
    <LoadingSpiner visible={loading} />
    <input type="file" multiple={true}
      onChange={e => {
        if (e.target.files)
          dispatch(LoadingPageAction.loadAndParseDate(e.target.files))
      }}/>
      <ExportToCSV
        csvFrom={() => csvFromMainData(mainData, period)}
        fileName={'Raf_data'}
        enable={Boolean(Object.keys(mainData).length)}
      /> 
    <div className="files-table">
      {filesMetaData.length ? <div className={cn('table__row', 'header')}>
        <div>Имя файла</div>
        <div>Количесвто измерений</div>
        <div>Первое измерение</div>
        <div>Последнее измерение</div>
        <div>Псевдоним</div>
      </div> : null}
      {filesMetaData.map((i, index) => <div
        className={cn('table__row', 'body')}
        key={i.fileName}
        onClick={e => {
          if (!(e.target instanceof(HTMLInputElement)))
            dispatch(LoadingPageAction.createRemoveDataIemt(index, i.fileName))
        }}>
        <div>{i.fileName}</div>
        <div>{i.numberOfMeasurements.toString()}</div>
        <div>{new Date(i.startMeasurements).toLocaleString()}</div>
        <div>{new Date(i.endMeasurements).toLocaleString()}</div>
        <div><input type="text" value={i.pseudonym}
          onChange={e => dispatch(LoadingPageAction.createSetPsevdonim(e.target.value, index))}
          onBlur={e => {
            if (e.target.value === '') dispatch(LoadingPageAction.createSetPsevdonim(i.fileName, index))
          }}
        /></div>
      </div>)}
    </div>
  </div>
}