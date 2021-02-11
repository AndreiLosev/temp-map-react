import React from 'react'
import {PointsInSpace} from '../pointsInSpace/pointsInSpace'
import {ChartData3d} from '../chartData3d/chartData3d'

export const Temp3DChartPage = () => {
  return <div className="temp-3d-chart">
    <PointsInSpace />
    <ChartData3d index={0} chartType='Температура' />
  </div>
}