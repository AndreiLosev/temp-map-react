import React from 'react'
import {PointsInSpace} from '../pointsInSpace/pointsInSpace'
import {colorsArr} from '../../utils/mainData'

export const Hum3DChartPage = () => {
  colorsArr.reverse()
  return <div className="hum-3d-chart">
    <PointsInSpace />
    {colorsArr.map(i => <div style={{width: '50px', height: '10px', backgroundColor: i}} key={i}></div>)}
  </div>
}