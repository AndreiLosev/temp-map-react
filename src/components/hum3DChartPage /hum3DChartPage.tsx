import React from 'react'
import './hum3DChartPage.scss'
import {PointsInSpace} from '../pointsInSpace/pointsInSpace'
import {ChartData3d} from '../chartData3d/chartData3d'
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from '../../redusers'
import {chart3dTHAction} from '../../redusers/chart3dHReduser'

export const Hum3DChartPage = () => {
  const dispatch = useDispatch()
  const charts3D = useSelector((state: AppState) => state.hum3dCharts.charts3D)
  const {filesMetaData, period} = useSelector((state: AppState) => state.loadingPage)
  return <div className="temp-3d-chart">
    <PointsInSpace />
    {charts3D.map((_, i) => <ChartData3d index={i} chartType='Влажность' key={i}/>)}
    <button
      className="add_button_3D"
      onClick={() => {
        if (filesMetaData.length) {
          dispatch(chart3dTHAction.createAdd3dChart(period.start))
        }
      }}>
      +
    </button>
  </div>
}