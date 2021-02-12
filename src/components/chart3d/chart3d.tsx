import React from 'react'
import './chart3d.scss'
import Plot from 'react-plotly.js'
import Plotly from 'plotly.js'


type Props = {
  data: {
    x: number[],
    y: number[],
    z: number[],
    text: string[],
  }[]
  title: string,
  conlors?: string[]
  type: Plotly.PlotType,
  mode?: 'lines'
  | 'markers'
  | 'text'
  | 'lines+markers'
  | 'text+markers'
  | 'text+lines'
  | 'text+lines+markers'
  | 'none'
  | 'gauge'
  | 'number'
  | 'delta'
  | 'number+delta'
  | 'gauge+number'
  | 'gauge+number+delta'
  | 'gauge+delta',
  width: number,
  height: number,
  
}

export const Chart3D: React.FC<Props> = ({data, title, type, mode, width, height, conlors}) => {
  const traces: Plotly.Data[] = data.map(i => ({
      ...i,
      type: type,
      mode: mode,
      marker: {
        color: conlors ? conlors : i.x.map(() => '#4cca8c'),
        opacity: 0.80,
        size: 20,
        symbol: 'circle',
      },
      textfont: {
        size: 35,
        family: "Times New Roman",
      },
      textposition: 'middle center',
  }))
  return <Plot
    data={traces}
    layout={{
      width: width,
      height: height,
      title: title,
  }}
  />
}