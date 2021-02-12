import React from 'react'
import './temp3DChartPage.scss'
import {PointsInSpace} from '../pointsInSpace/pointsInSpace'
import {ChartData3d} from '../chartData3d/chartData3d'
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from '../../redusers'
import {chart3dTAction} from '../../redusers/chart3dTReduser'

export const Temp3DChartPage = () => {
  const dispatch = useDispatch()
  const charts3D = useSelector((state: AppState) => state.temp3dCharts.charts3D)
  const filesMetaData = useSelector((state: AppState) => state.loadingPage.filesMetaData)
  return <div className="temp-3d-chart">
    <PointsInSpace />
    {charts3D.map((_, i) => <ChartData3d index={i} chartType='Температура' key={i}/>)}
    <button
      className="add_button_3D"
      onClick={() => {
        if (filesMetaData.length) {
          dispatch(chart3dTAction.createAdd3dChart())
        }
      }}>
      +
    </button>
  </div>
}