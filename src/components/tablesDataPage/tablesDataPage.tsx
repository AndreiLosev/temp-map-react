import React from 'react'
import './tablesDataPage.scss'
import {useDispatch, useSelector} from 'react-redux'
import {AppState} from '../../redusers'
import {TableDataAction} from '../../redusers/tableDataReduser'
import {LoadingSpiner} from '../loading/loading'
import {SetPeriodAndCalc} from '../setPeriodAndCalc/setPeriodAndCalc'
import {AbsExtremumTable} from './absExtrmunmTable'
import {ExtremumTable} from './extremumTable'
import {ExportToCSV} from '../exportToCSV/exportToCSV'
import { csvFromExtremum } from '../../utils/loadUpload'


export const TablesDataPage: React.FC = () => {
  const loadingPage = useSelector((state: AppState) => state.loadingPage)
  const tablesDataPage = useSelector((state: AppState) => state.tableData)
  const dispatch = useDispatch()
  return <div className="data-page">
    <SetPeriodAndCalc
      start={tablesDataPage.period.start}
      end={tablesDataPage.period.end}
      maxPeriod={loadingPage.period}
      setPeriod={(dateTime, type) => dispatch(TableDataAction.createSetPeriod(dateTime, type))}
      calculate={() => {
        const pseudonyms = loadingPage.filesMetaData
          .reduce((acc, i) => ({...acc, [i.fileName]: i.pseudonym}), {} as {[x: string]: string})
        dispatch(TableDataAction.createCalculate(
          loadingPage.mainData, tablesDataPage.period, pseudonyms,
        ))}
      }
    />
    <ExportToCSV
      csvFrom={() => csvFromExtremum(tablesDataPage.extremums, tablesDataPage.absExtremum)}
      fileName={'Calculate_data.csv'}
      enable={Boolean(Object.keys(tablesDataPage.extremums).length)}
    />
    <LoadingSpiner visible={tablesDataPage.loading} />
    <ExtremumTable
      data={tablesDataPage.extremums}
      visible={Boolean(Object.keys(tablesDataPage.extremums).length)}
    />
    <AbsExtremumTable
      date={tablesDataPage.absExtremum}
      visible={Boolean(Object.keys(tablesDataPage.extremums).length)}
    />
  </div>
}