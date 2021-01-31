import React from 'react'
import cn from 'classnames'
import {useSelector, useDispatch} from 'react-redux'
import './loadingPage.scss'
import {AppState} from '../../redusers/index'
import { LoadingPageAction } from '../../redusers/loadingFileReduser'
import {LoadingSpiner} from '../loading/loading'
import {csvFromMainData, prepareDataForDownload} from '../../utils/loadUpload'

export const LoadingPage = () => {
  const {loading, filesMetaData, mainData, period} = useSelector((state: AppState) => state.loadingPage)
  const [downloadDta, setDownloadData] = React.useState('')
  const dispatch = useDispatch()
  const aref = React.useRef(null)
  return <div className={cn('loadingPage')}>
    <LoadingSpiner visible={loading} />
    <input type="file" multiple={true}
      onChange={e => {
        if (e.target.files)
          dispatch(LoadingPageAction.loadAndParseDate(e.target.files))
      }}/>
    <button className='create-export' onClick={() => {
      const text = csvFromMainData(mainData, period)
      const result = text ? prepareDataForDownload(text) : ''

      setDownloadData(result)
    }}>
      Экспорт в csv
    </button>
    {downloadDta ? <a className="termo-map" download="termo_map.csv" href={downloadDta} ref={aref}>
      termoMap
    </a> : null}
    {/* <a download="9dksk239xwd.txt" ref={aref} >test</a>
    <button onClick={() => {
        var type = 'data:application/octet-stream;base64, ';
        var text = 'Hello world !!!!!!!!!';
        var base = btoa(text);
        var res = type + base;
        if (aref.current) {
          // @ts-ignore
          aref.current.href = res;
        }
    }}>testbutton</button> */}
    <div className="files-table">
      {filesMetaData.length ? <div className={cn('table__row', 'header')}>
        <div>Имя файла</div>
        <div>Количесвто измерений</div>
        <div>Первое измерение</div>
        <div>Последнее измерение</div>
        <div>Псевдоним</div>
      </div> : null}
      {filesMetaData.map((i, index) => <div className={cn('table__row', 'body')} key={i.fileName}>
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