import React from 'react'
import './chartData3d.scss'
import Inputmask from 'inputmask'
import {Chart3D} from '../chart3d/chart3d'

type Props = {
  index: number,
  chartType: 'Температура' | 'Влажность'
}

export const ChartData3d: React.FC<Props> = ({index, chartType}) => {
  const datTimeinput = React.useRef<HTMLInputElement>(null)
  React.useEffect(() => {
    const mask = new Inputmask('99.99.9999, 99:99')
    if (datTimeinput.current)
      mask.mask(datTimeinput.current)
  }, [])
  
  return <div className="chartData3d">
    <div className="chartData3d-header">
      <div className="select-data">
        <input type="checkbox" className="selec-data-input"/>
        <input type="checkbox" className="selec-data-input"/>
      </div>
      <div className="target-data-extremum">
        <input type="checkbox" className="target-data-extrmum-item"/>
        <input type="checkbox" className="target-data-extrmum-item"/>
        <input type="checkbox" className="target-data-extrmum-item"/>
      </div>
      <input type="text" className="target-data-time" ref={datTimeinput}/>
    </div>
    <Chart3D title='test' type='scatter3d' mode='text+markers' width={1750} height={1026}
      data={[{ x: [0, 1, 2, 0], y: [0, 0, 1, 2], z: [0, 2, 0, 1], text: ['one', 'two', 'three', '444']}]}
    />
  </div>
}