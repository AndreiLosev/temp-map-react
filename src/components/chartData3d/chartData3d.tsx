import React from 'react'
import './chartData3d.scss'
import Inputmask from 'inputmask'
import {Chart3D} from '../chart3d/chart3d'
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from '../../redusers'
import {chart3dTAction} from '../../redusers/chart3dTReduser'
import {chart3dTHAction} from '../../redusers/chart3dHReduser'
import {pointsPositionForPlot3D} from '../../utils/mainData'

type Props = {
  index: number,
  chartType: 'Температура' | 'Влажность'
}

export const ChartData3d: React.FC<Props> = ({index, chartType}) => {
  const typeAction = chartType === 'Температура' ? chart3dTAction : chart3dTHAction
  const typeState = chartType === 'Температура' ? 'temp3dCharts' : 'hum3dCharts'
  const typeValue = chartType === 'Температура' ? 'temperature' : 'humidity'
  const datTimeinput = React.useRef<HTMLInputElement>(null)
  React.useEffect(() => {
    const mask = new Inputmask('99.99.9999, 99:99')
    if (datTimeinput.current)
      mask.mask(datTimeinput.current)
  }, [])
  const {dataСube, extremums} = useSelector((state: AppState) => state.tableData)
  const {extrmum, selectData, chart3dData} = useSelector((state: AppState) => state[typeState].charts3D[index])
  const dispatch = useDispatch()
  const colorScale = Array.from(chart3dData.colorsValuesMap.entries())
  colorScale.reverse()
  return <div className="chartData3d">
    <div className="chartData3d-header">
      {/* <div className="select-data">
        <input type="checkbox" className="selec-data-input"/>
        <input type="checkbox" className="selec-data-input"/>
      </div> */}
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
      {selectData === 'time' ? <input type="text" className="target-data-time" ref={datTimeinput}/> : null}
      <button className="calculate"
        onClick={() => {
          const values = Object.values(extremums).map(item => item[typeValue][extrmum].value)
          const maxValue = Math.max.apply(null, values)
          const minValue = Math.min.apply(null, values)
          dispatch(typeAction.createGet3dChartData(
            pointsPositionForPlot3D(dataСube), typeValue, extrmum,
            maxValue, minValue, extremums, index,
          ))
        }}
      >
        Calculate
      </button>
    </div>
    <div className="chard-3d-result">
      <Chart3D title={chartType} type='scatter3d' mode='text+markers' width={1024} height={1024}
        data={[chart3dData.positionData]} conlors={chart3dData.colorsValues}
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