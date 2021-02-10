import React from 'react'
import './chart.scss'
import Plotly from 'plotly.js'

type Props = {
  data: {
    x: (number | string)[],
    y: (number | string)[],
    name: string,
  }[],
  name: string,
}

export const Chart: React.FC<Props> = ({data, name}) => {
  const chartRef = React.useRef<HTMLDivElement>(null)
  const layout: Partial<Plotly.Layout> = {
    title: name,
  }
  React.useEffect(() => {
    if (chartRef.current instanceof HTMLDivElement) {
      Plotly.newPlot(chartRef.current, data, layout)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chartRef.current])
  return <div className='ChartT' ref={chartRef}></div>
}