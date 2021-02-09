import React from 'react'
import './tempChartPage.scss'
import {useDispatch, useSelector} from 'react-redux'
import {AppState} from '../../redusers'
import {ChartData} from '../chartData/chartData'
import {chartAction} from '../../redusers/chartTReduser'


export const TempChartPage: React.FC<{}> = () => {
  const dispatch = useDispatch()
  const charts = useSelector((state: AppState) => state.tempCharts.charts)
  const {period, filesMetaData} = useSelector((state: AppState) => state.loadingPage)
  return <div className="tempChartData">
    <button
      className="add_button"
      onClick={() => dispatch(
        chartAction.createAddChart(period, filesMetaData.map(i => i.pseudonym)),
      )}>
      +
    </button>
    <div className="Charts-Array">
      {charts.map((_, i) => <ChartData index={i} chartType="Температура" key={i.toString()}/>)}
    </div>
  </div>
}