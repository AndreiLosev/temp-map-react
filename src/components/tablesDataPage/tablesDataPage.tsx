import React from 'react'
import './tablesDataPage.scss'
import {useDispatch, useSelector} from 'react-redux'
import {AppState} from '../../redusers'
import cn from 'classnames'
import {TableDataAction} from '../../redusers/tableDataReduser'
import {LoadingSpiner} from '../loading/loading'
import Inputmask from 'inputmask'
import {myDatePars} from '../../utils/lilteUtils'


export const TablesDataPage: React.FC = () => {
  const loadingPage = useSelector((state: AppState) => state.loadingPage)
  const tablesDataPage = useSelector((state: AppState) => state.tableData)
  const [periodS, setPeriodS] = React.useState({start: '', end: ''})
  const refStart = React.useRef<HTMLInputElement>(null)
  const refEnd = React.useRef<HTMLInputElement>(null)
  const dispatch = useDispatch()
  React.useEffect(() => {
    const {start, end} = tablesDataPage.period
    if (!start && !end) {
      const {start, end} = loadingPage.period
      setPeriodS({
        start: new Date(start).toLocaleString(),
        end: new Date(end).toLocaleString()
      })
    } else {
      setPeriodS({
        start: new Date(start).toLocaleString(),
        end: new Date(end).toLocaleString()
      })
    }
    const mask = new Inputmask('99.99.9999, 99:99')
    if (refStart.current && refEnd.current) {
      mask.mask(refStart.current)
      mask.mask(refEnd.current)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  React.useEffect(() => {
    const validReg = /\d\d.\d\d.\d\d\d\d, \d\d:\d\d/
    const validStart = validReg.test(periodS.start)
    const validEnd = validReg.test(periodS.end)
    if (validStart && validEnd) {
      const startA = myDatePars(periodS.start)
      const endA = myDatePars(periodS.end)
      const start = + new Date(startA[0], startA[1], startA[2], startA[3], startA[4])
      const end = + new Date(endA[0], endA[1], endA[2], endA[3], endA[4])
      dispatch(TableDataAction.createSetPeriod(start, 'start'))
      dispatch(TableDataAction.createSetPeriod(end, 'end'))
    }
  }, [periodS, dispatch])
  return <div className="data-page">
    <LoadingSpiner visible={tablesDataPage.loading} />
    <div className="period-settings">
      <span>start</span>
      <input
        type="text" className="period" ref={refStart}
        value={periodS.start}
        onChange={e => setPeriodS(prev => ({...prev, start: e.target.value}))}
      />
      <span>end</span>
      <input
        type="text" className="period" ref={refEnd}
        value={periodS.end}
        onChange={e => setPeriodS(prev => ({...prev, end: e.target.value}))}
      />
      <button className="calculate" onClick={() =>{
        if (loadingPage.period.start > tablesDataPage.period.start) {
          setPeriodS(prev => ({...prev, start: new Date(loadingPage.period.start).toLocaleString()}))
          return
        } else if (loadingPage.period.end < tablesDataPage.period.end) {
          setPeriodS(prev => ({...prev, end: new Date(loadingPage.period.end).toLocaleString()}))
          return
        } else if (tablesDataPage.period.end <= tablesDataPage.period.start) {
          setPeriodS(prev => ({...prev, start: new Date(loadingPage.period.start).toLocaleString()}))
          setPeriodS(prev => ({...prev, end: new Date(loadingPage.period.end).toLocaleString()}))
          return
        }
      }}>Calculate</button>
    </div>
    <div className="data-page-main">
      <div className={cn('table__row', 'header')}>
        <div>Точка</div>
        <div>Минимальная температруа</div>
        <div>Когда</div>
        <div>Средняя температруа</div>
        <div>Когда</div>
        <div>Максимальная температруа</div>
        <div>Когда</div>
        <div>Минимальная влажность</div>
        <div>Когда</div>
        <div>Средняя влажность</div>
        <div>Когда</div>
        <div>Максимальная влажность</div>
        <div>Когда</div>
      </div>
    </div>
  </div>
}