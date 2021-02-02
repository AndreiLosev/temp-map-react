import React from 'react'
import './tablesDataPage.scss'
import {useDispatch, useSelector} from 'react-redux'
import {AppState} from '../../redusers'
import cn from 'classnames'
import {TableDataAction} from '../../redusers/tableDataReduser'
import {LoadingSpiner} from '../loading/loading'
import Inputmask from 'inputmask'


export const TablesDataPage: React.FC = () => {
  const loadingPage = useSelector((state: AppState) => state.loadingPage)
  const tablesDataPage = useSelector((state: AppState) => state.tableData)
  const refStart = React.useRef<HTMLInputElement>(null)
  const refEnd = React.useRef<HTMLInputElement>(null)
  const dispatch = useDispatch()
  React.useEffect(() => {
    const {start, end} = tablesDataPage.period
    if (!start && !end) {
      const {start, end} = loadingPage.period
      dispatch(TableDataAction.createSetPeriod(start, 'start'))
      dispatch(TableDataAction.createSetPeriod(end, 'end'))
    }
    const mask = new Inputmask('99.99.9999 99:99')
    if (refStart.current && refEnd.current) {
      mask.mask(refStart.current)
      mask.mask(refEnd.current)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return <div className="data-page">
    <LoadingSpiner visible={tablesDataPage.loading} />
    <div className="period-settings">
      <span>start</span>
      <input
        type="text" className="period" ref={refStart}
        value={new Date(tablesDataPage.period.start).toLocaleString()}
        onChange={e => dispatch(TableDataAction.createSetPeriod(+new Date(e.target.value), 'start'))}
      />
      <span>end</span>
      <input
        type="text" className="period" ref={refEnd}
        value={new Date(tablesDataPage.period.end).toLocaleString()}
        onChange={e => dispatch(TableDataAction.createSetPeriod(+new Date(e.target.value), 'end'))}
      />
      <button className="calculate">Calculate</button>
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