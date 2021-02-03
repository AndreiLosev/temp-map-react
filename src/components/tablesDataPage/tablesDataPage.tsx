/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import './tablesDataPage.scss'
import {useDispatch, useSelector} from 'react-redux'
import {AppState} from '../../redusers'
import cn from 'classnames'
import {TableDataAction} from '../../redusers/tableDataReduser'
import {LoadingSpiner} from '../loading/loading'
import {SetPeriodAndCalc} from '../setPeriodAndCalc/setPeriodAndCalc'


export const TablesDataPage: React.FC = () => {
  const loadingPage = useSelector((state: AppState) => state.loadingPage)
  const tablesDataPage = useSelector((state: AppState) => state.tableData)
  const dispatch = useDispatch()
  React.useEffect(() => {
    const {start, end} = tablesDataPage.period
    if (!start && !end) {
      dispatch(TableDataAction.createSetPeriod(loadingPage.period.start, 'start'))
      dispatch(TableDataAction.createSetPeriod(loadingPage.period.end, 'end'))
    }
  }, [])
  return <div className="data-page">
    <SetPeriodAndCalc
      start={tablesDataPage.period.start}
      end={tablesDataPage.period.end}
      maxPeriod={loadingPage.period}
      setPeriod={(dateTime, type) => dispatch(TableDataAction.createSetPeriod(dateTime, type))}
      calculate={() => {
        dispatch(TableDataAction.createCalculate(
          loadingPage.mainData, tablesDataPage.period, loadingPage.filesMetaData.map(i => i.pseudonym)
        ))}
      }
    />
    <LoadingSpiner visible={tablesDataPage.loading} />
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