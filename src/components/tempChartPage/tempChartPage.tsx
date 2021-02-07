import React from 'react'
import './tempChartPage.scss'
import {useDispatch, useSelector} from 'react-redux'


export const TempChartPage: React.FC<{}> = () => {
  const dispatch = useDispatch()
  return <div className="tempChartData">
    <button className="add_button">+</button>
  </div>
}