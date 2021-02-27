import React from 'react'
import './chartData3d.scss'
import Inputmask from 'inputmask'
import {Chart3D} from '../chart3d/chart3d'
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from '../../redusers'
import {chart3dTAction} from '../../redusers/chart3dTReduser'
import {chart3dTHAction} from '../../redusers/chart3dHReduser'
import {getChart3dDataFromTime, pointsPositionForPlot3D} from '../../utils/mainData'
import {myDatePars} from '../../utils/lilteUtils'
import {getChart3dData} from '../../utils/mainData'

type Props = {
  index: number,
  chartType: 'Температура' | 'Влажность'
}

export const ChartData3d: React.FC<Props> = ({index, chartType}) => {
  const typeAction = chartType === 'Температура' ? chart3dTAction : chart3dTHAction
  const typeState = chartType === 'Температура' ? 'temp3dCharts' : 'hum3dCharts'
  const typeValue = chartType === 'Температура' ? 'temperature' : 'humidity'
  const datTimeinput = React.useRef<HTMLInputElement>(null)
  const {dataСube, extremums, room, door} = useSelector((state: AppState) => state.tableData)
  const {extrmum, selectData, chart3dData, time} = useSelector((state: AppState) => state[typeState].charts3D[index])
  const {period, mainData, filesMetaData} = useSelector((state: AppState) => state.loadingPage)
  const [timeS, setTimeS] = React.useState('')
  React.useEffect(() => {
    const mask = new Inputmask('99.99.9999, 99:99')
    if (datTimeinput.current)
      mask.mask(datTimeinput.current)
    if (timeS === '') setTimeS(new Date(time).toLocaleString())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectData])
  const dispatch = useDispatch()
  const colorScale = Array.from(chart3dData.colorsValuesMap.entries())
  colorScale.reverse()
  return <div className="chartData3d">
    <div className="target-data-extremum">
      <div className="select-data">
        <div className="target-data-extrmum-item"
          onClick={() => dispatch(typeAction.createSelectData('time', index))}>
          <span>Time</span>
          <input type="checkbox" onChange={e => e.preventDefault()} checked={selectData === 'time'}/>
        </div>
        <div className="target-data-extrmum-item"
          onClick={() => dispatch(typeAction.createSelectData('extrmum', index))}>
          <span>Extremum</span>
          <input type="checkbox" onChange={e => e.preventDefault()} checked={selectData === 'extrmum'}/>
        </div>
      </div>
      {selectData === 'extrmum' ? <div className="target-data-extremum">
        <div className="target-data-extrmum-item"
          onClick={() => dispatch(typeAction.createSetExtremum('min', index))}>
          <span>min</span>
          <input type="checkbox"
            checked={extrmum === 'min'}
            onChange={e => e.preventDefault()}
          />
        </div>
        <div className="target-data-extrmum-item"
          onClick={() => dispatch(typeAction.createSetExtremum('mid', index))}>
          <span>mid</span>
          <input type="checkbox"
            checked={extrmum === 'mid'}
            onChange={e => e.preventDefault()}
          />
        </div>
        <div className="target-data-extrmum-item"
          onClick={() => dispatch(typeAction.createSetExtremum('max', index))}>
          <span>max</span>
          <input type="checkbox"
            checked={extrmum === 'max'}
            onChange={e => e.preventDefault()}
          />
        </div>
      </div> : null}
      {selectData === 'time'
        ? <input type="text" className="period" ref={datTimeinput} value={timeS}
          onChange={e => {
            const [Year, Munth, Day, Hours, Minuts] = myDatePars(e.target.value)
            .map(i => i ? i : 0)
          dispatch(typeAction.createSetTime(+new Date(Year, Munth, Day, Hours, Minuts), index))
          setTimeS(e.target.value)
          }}
          />
        : null}
      <button className="calculate"
        onClick={() => {
          if (selectData === 'extrmum') {
            if (Object.keys(extremums).length === 0) return alert('Extremums ещё не расчитаны')
            const values = Object.values(extremums).map(item => item[typeValue][extrmum].value)
            const maxValue = Math.max.apply(null, values)
            const minValue = Math.min.apply(null, values)
            const result = getChart3dData(
              pointsPositionForPlot3D(dataСube), typeValue, extrmum,
              maxValue, minValue, extremums,
            )
            dispatch(typeAction.createGet3dChartData(result, index)) 
          } else if (selectData === 'time') {
            if (time < period.start) return alert('time < start')
            if (time > period.end) return alert('time > end')
            const result = getChart3dDataFromTime(
              pointsPositionForPlot3D(dataСube), typeValue,
              mainData, time, filesMetaData,
            )
            dispatch(typeAction.createGet3dChartData(result, index))
          }
        }}
      >
        Calculate
      </button>
    </div>
    <div className="chard-3d-result">
      <Chart3D title={chartType} type='scatter3d' mode='text+markers' width={1024} height={1024}
        data={[chart3dData.positionData]} conlors={chart3dData.colorsValues} hoverinfo='text'
        room = {room} door={door}
      />
      <div className="color-scale">
        {colorScale.map(i => <div className="color-scale-item" key={i.toString()}>
          <div style={{width: '30px', height: '15px', backgroundColor: i[1]}}></div>
          <div>{i[0]}</div>
        </div>)}
      </div>
    </div>
  </div>
}