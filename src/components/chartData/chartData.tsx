import React from 'react'
import './chartData.scss'
import {SetPeriodAndCalc} from '../setPeriodAndCalc/setPeriodAndCalc'
import {useDispatch, useSelector} from 'react-redux'
import {AppState} from '../../redusers'
import {chartAction} from '../../redusers/chartTReduser'
import {createChartData} from '../../utils/mainData'
import {Chart} from '../chart/chart'

type Props = {
  index: number,
  chartType: 'Температура' | 'Влажность'
}

export const ChartData: React.FC<Props> = ({index, chartType}) => {
  const dispatch = useDispatch()
  const {period, mainData, filesMetaData} = useSelector((state: AppState) => state.loadingPage)
  const {period:{start, end}, step, chartData, points} = useSelector((state: AppState) => state.tempCharts.charts[index])
  const OneMinut = 60 * 1000
  return <div className="chartData">
    <div className="chartData-header">
      <input type="text" />
      <SetPeriodAndCalc
        maxPeriod={period}
        start={start}
        end={end}
        setPeriod={(dateTime, type) => dispatch(chartAction.createSetPeriod(dateTime, type, index))}
        calculate={() => {
          const pseudonyms = filesMetaData
            .reduce((acc, i) => ({...acc, [i.fileName]: i.pseudonym}), {} as {[x: string]: string})
          const forChart = createChartData(mainData, {start, end}, step * OneMinut, 'temperature', pseudonyms)
          dispatch(chartAction.createGetChaerData(forChart, index))
        }}
        step={step}
        setStep={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(
          chartAction.createSetStep(parseInt(e.target.value), index),
        )}
      />
    </div>
    <div className="points-area">
      {filesMetaData.map(point => <div key={point.fileName} onClick={() => {
          const check = points.includes(point.pseudonym)
          if (check) 
            dispatch(chartAction.createUpdatePoints(points.filter(i => i !== point.pseudonym), index))
          else
            dispatch(chartAction.createUpdatePoints(points.concat([point.pseudonym]), index))
        }}>
        <span>{point.pseudonym}</span>
        <input type="checkbox" checked={points.includes(point.pseudonym)} onChange={e => e.preventDefault()}/>
      </div>)}
    </div>
    <Chart data={chartData} name={chartType}/>
  </div>
}