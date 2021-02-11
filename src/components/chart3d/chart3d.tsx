import React from 'react'
import './chart3d.scss'
import Plotly from 'plotly.js'

type Props = {}

export const Chart3D: React.FC<Props> = () => {
  const chartRef = React.useRef<HTMLDivElement>(null)
  const layout = {margin: {
      l: 0,
      r: 0,
      b: 0,
      t: 0,
  }};
  const trace1: Plotly.Data = {
    x: [1, 2, 3], y: [1, 2, 3], z: [1, 2, 3],
    mode: 'markers',
    marker: {
      size: 12,
      line: {
      color: 'rgba(217, 217, 217, 0.14)',
      width: 0.5},
      opacity: 0.8},
    type: 'scatter3d'
  };
  React.useEffect(() => {
    if (chartRef.current instanceof HTMLDivElement) {
      Plotly.newPlot(chartRef.current, [trace1], layout)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chartRef.current])
  return <div className='Chart3D' ref={chartRef}></div>
}