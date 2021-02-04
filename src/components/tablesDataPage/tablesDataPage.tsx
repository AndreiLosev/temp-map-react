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
  const dataType = ['temperature', 'humidity']
  const absExtremum = {
    min:'Минемальная',
    mid: {
      min: 'Максимальная из средних',
      mid: 'Средвняя в помещении',
      max: 'Максимальных из средних',
    },
    max: 'Максимальная',
  }
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
    <div className="absExtremum">
      <div className={cn('table__row', 'body')}>
        <div></div>
      </div>
    </div>
    <div className="data-page-main">
      {Object.keys(tablesDataPage.extremums).length ? <div className={cn('table__row', 'header')}>
        <div>Точка</div>
        <div>Минимальная температруа</div>
        <div>Когда</div>
        <div>Средняя температруа</div>
        <div>За период</div>
        <div>Максимальная температруа</div>
        <div>Когда</div>
        <div>Минимальная влажность</div>
        <div>Когда</div>
        <div>Средняя влажность</div>
        <div>За период</div>
        <div>Максимальная влажность</div>
        <div>Когда</div>
      </div> : null}
      {Object.keys(tablesDataPage.extremums).map(key => <div key={key} className={cn('table__row', 'body')}>
        <div>{key}</div>
        <div>{tablesDataPage.extremums[key].temperature.min.value}</div>
        <div>{tablesDataPage.extremums[key].temperature.min.date}</div>
        <div>{tablesDataPage.extremums[key].temperature.mid.value}</div>
        <div>{tablesDataPage.extremums[key].temperature.mid.date}</div>
        <div>{tablesDataPage.extremums[key].temperature.max.value}</div>
        <div>{tablesDataPage.extremums[key].temperature.max.date}</div>
        <div>{tablesDataPage.extremums[key].humidity.min.value}</div>
        <div>{tablesDataPage.extremums[key].humidity.min.date}</div>
        <div>{tablesDataPage.extremums[key].humidity.mid.value}</div>
        <div>{tablesDataPage.extremums[key].humidity.mid.date}</div>
        <div>{tablesDataPage.extremums[key].humidity.max.value}</div>
        <div>{tablesDataPage.extremums[key].humidity.max.date}</div>
      </div>)}
    </div>
  </div>
}