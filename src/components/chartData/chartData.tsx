import React from 'react'
import './chartData.scss'
import {SetPeriodAndCalc} from '../setPeriodAndCalc/setPeriodAndCalc'
import {useDispatch, useSelector} from 'react-redux'
import {AppState} from '../../redusers'
import {chartAction} from '../../redusers/chartTReduser'
import {chartHAction} from '../../redusers/chartHReduser'
import {createChartData} from '../../utils/mainData'
import {Chart} from '../chart/chart'

type Props = {
  index: number,
  chartType: 'Температура' | 'Влажность',
}

export const ChartData: React.FC<Props> = ({index, chartType}) => {
  const typeChart1 = chartType === 'Температура' ? 'tempCharts' : 'humCharts'
  const typeChart2 = chartType === 'Температура' ? 'temperature' : 'humidity'
  const typeChart3 = chartType === 'Температура' ? chartAction : chartHAction
  const dispatch = useDispatch()
  const {period, mainData, filesMetaData} = useSelector((state: AppState) => state.loadingPage)
  const {period:{start, end}, step, points, chartData} = useSelector((state: AppState) => state[typeChart1].charts[index])
  const OneMinuts = 60 * 1000
  return <div className="chartData">
    <div className="chartData-header">
      <input type="text" />
      <SetPeriodAndCalc
        maxPeriod={period}
        start={start}
        end={end}
        setPeriod={(dateTime, type) => dispatch(typeChart3.createSetPeriod(dateTime, type, index))}
        calculate={() => {
          const forChart = createChartData(mainData, {start, end}, step * OneMinuts, typeChart2, points)
          dispatch(typeChart3.createGetChaerData(forChart, index))
        }}
        step={step}
        setStep={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(
          typeChart3.createSetStep(parseInt(e.target.value), index),
        )}
      />
    </div>
    <div className="points-area">
      {filesMetaData.map(point => <div key={point.fileName} onClick={() => {
          const check = Object.values(points).includes(point.pseudonym)
          if (check) {
            const newPoints = {...points}
            delete(newPoints[point.fileName])
            dispatch(typeChart3.createUpdatePoints(newPoints, index))
          }
          else
            dispatch(typeChart3.createUpdatePoints({...points, [point.fileName]: point.pseudonym}, index))
        }}>
        <span>{point.pseudonym}</span>
        <input type="checkbox" checked={Object.values(points).includes(point.pseudonym)} onChange={e => e.preventDefault()}/>
      </div>)}
    </div>
    <Chart data={chartData} name={chartType} key={`${chartData.map(i => i.name + i.x.toString() + i.y.toString())}`}/>
  </div>
}