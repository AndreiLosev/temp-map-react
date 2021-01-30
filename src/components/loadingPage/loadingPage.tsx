import React from 'react'
import cn from 'classnames'
import {useSelector, useDispatch} from 'react-redux'
import './loadingPage.scss'
import {AppState} from '../../redusers/index'
import { LoadingPageAction } from '../../redusers/loadingFileReduser'
import {LoadingSpiner} from '../loading/loading'

export const LoadingPage = () => {
  const {loading, filesMetaData} = useSelector((state: AppState) => state.loadingPage)
  const dispatch = useDispatch()
  return <div className={cn('loadingPage')}>
    <LoadingSpiner visible={loading} />
    <input type="file" multiple={true}
      onChange={e => {
        if (e.target.files)
          dispatch(LoadingPageAction.loadAndParseDate(e.target.files))
      }}/>
    <div className="files-table">
      {filesMetaData.map(i => <div className="files-table__row">
        <div className="files-table__row__item">{i.fileName}</div>
        <div className="files-table__row__item">{i.numberOfMeasurements.toString()}</div>
        <div className="files-table__row__item">{new Date(i.startMeasurements).toLocaleString()}</div>
        <div className="files-table__row__item">{new Date(i.endMeasurements).toLocaleString()}</div>
        <div className="files-table__row__item">
          <input type="text" value={i.pseudonym} onChange={}/>
        </div>        
      </div>)}
    </div>
  </div>
}