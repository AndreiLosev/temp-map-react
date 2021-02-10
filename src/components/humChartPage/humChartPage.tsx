import React from 'react'
import './humChartPage.scss'
import {useDispatch, useSelector} from 'react-redux'
import {AppState} from '../../redusers'
import {ChartData} from '../chartData/chartData'
import {chartHAction} from '../../redusers/chartHReduser'


export const HumChartPage: React.FC<{}> = () => {
  const dispatch = useDispatch()
  const charts = useSelector((state: AppState) => state.humCharts.charts)
  const {period, filesMetaData} = useSelector((state: AppState) => state.loadingPage)
  return <div className="tempChartData">
    <button
      className="add_button"
      onClick={() => {
        if (filesMetaData.length) {
          const pseudonyms = filesMetaData
            .reduce((acc, i) => ({...acc, [i.fileName]: i.pseudonym}), {} as {[x: string]: string})
          dispatch(chartHAction.createAddChart(period, pseudonyms))
        }
      }}>
      +
    </button>
    <div className="Charts-Array">
      {charts.map((_, i) => <ChartData index={i} chartType="Влажность" key={i}/>)}
    </div>
  </div>
}