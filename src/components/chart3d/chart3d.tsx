import React from 'react'
import './chart3d.scss'
import Plot from 'react-plotly.js'
import Plotly from 'plotly.js'
import {creataeRoom, createDoor} from '../../utils/mainData'


type Props = {
  data: {
    x: number[],
    y: number[],
    z: number[],
    text: string[],
    hovertext?: string[],
  }[]
  hoverinfo?: 'all' | 'text',
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
  room: { long: number, width: number, height: number },
  door: {
    x1: number,
    y1: number,
    z1: number,
    x2: number,
    y2: number,
    z2: number,
  },
}

export const Chart3D: React.FC<Props> = ({
  data, title, type, mode, width, height, conlors, hoverinfo='all', room, door,
}) => {
  const traces: Plotly.Data[] = data.map(i => ({
      ...i,
      type: type,
      mode: mode,
      hoverinfo: hoverinfo,
      marker: {
        color: conlors ? conlors : i.x.map(() => '#4cca8c'),
        opacity: 0.80,
        size: 17,
        symbol: 'circle',
      },
      textfont: {
        size: 35,
        family: "Times New Roman",
      },
      textposition: 'middle center',
  }))
  const roomLine = creataeRoom(room.width, room.long, room.height)
  const doorLine = createDoor(door)
  const line = [
    createLine(roomLine.ceiling, 3),
    createLine(roomLine.floor, 3),
    ...roomLine.angles.map(i => createLine(i, 3)),
    createLine(doorLine.edge, 3),
    createLine(doorLine.hatching, 1),
  ]
  return <Plot
    data={[...traces, ...line]}
    layout={{
      width: width,
      height: height,
      title: title,
  }}
  />
}

const createLine = (cords: {x: number[], y: number[], z: number[]}, width: number): Plotly.Data => ({
    type: 'scatter3d',
    mode: 'lines',
    x: cords.x,
    y: cords.y,
    z: cords.z,
    line: {
      width: width,
      color: '#a0a0a0',
    },
  })