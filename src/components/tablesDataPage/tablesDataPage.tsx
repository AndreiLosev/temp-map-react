import React from 'react'
import './tablesDataPage.scss'
import {useDispatch, useSelector} from 'react-redux'
import {AppState} from '../../redusers'
import cn from 'classnames'
import {TableDataAction} from '../../redusers/tableDataReduser'


export const TablesDataPage: React.FC = () => {
  const loadingPage = useSelector((state: AppState) => state.loadingPage)
  const tablesDataPage = useSelector((state: AppState) => state.tableData)
  const dispatch = useDispatch()
  React.useEffect(() => {
    const {start, end} = tablesDataPage.period
    if (!start && !end) {
      const {start, end} = loadingPage.period
      dispatch(TableDataAction.createSetPeriod(start, end))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return <div className="data-page">
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