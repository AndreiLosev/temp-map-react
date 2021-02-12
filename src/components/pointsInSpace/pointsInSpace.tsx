import React from 'react'
import './pointsInSpace.scss'
import {useSelector, useDispatch} from 'react-redux'
import {AppState} from '../../redusers'
import {TableDataAction} from '../../redusers/tableDataReduser'
import Inputmask from 'inputmask'
import {Chart3D} from '../chart3d/chart3d'
import {pointsPositionForPlot3D} from '../../utils/mainData'
import { ExportToCSV } from '../exportToCSV/exportToCSV'
import { loadFile } from '../../utils/loadUpload'

export const PointsInSpace = () => {
  const dispatch = useDispatch()
  const filesMetaData = useSelector((state: AppState) => state.loadingPage.filesMetaData)
  const dataCube = useSelector((state: AppState) => state.tableData.dataСube)
  React.useEffect(() => {
    if (Object.keys(dataCube).length === 0) {
      const value = {x: 0, y: 0, z: 0}
      const newDataCube = filesMetaData.map(i => i.pseudonym)
      .reduce((acc, item) => ({...acc, [item]: value}), {} as {[point: string]: typeof value})
      dispatch(TableDataAction.createSetPointsInSpace(newDataCube))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filesMetaData])
  React.useEffect(() => {
    const xMask = new Inputmask('x: 99999')
    const yMask = new Inputmask('y: 99999')
    const zMask = new Inputmask('z: 99999')
    const xInputs = document.querySelectorAll<HTMLInputElement>('.xInput')
    const yInputs = document.querySelectorAll<HTMLInputElement>('.yInput')
    const zInputs = document.querySelectorAll<HTMLInputElement>('.zInput')
    xInputs.forEach(i => xMask.mask(i))
    yInputs.forEach(i => yMask.mask(i))
    zInputs.forEach(i => zMask.mask(i))
  }, [filesMetaData])
  const editDateCube = (point: string, cord: 'x' | 'y' | 'z') => (e: React.ChangeEvent<HTMLInputElement>) => {
    const result = e.target.value.match(/\d+/g)
    if (result) 
      dispatch(TableDataAction.createSetPointsInSpace(
        {...dataCube, [point]: {...dataCube[point], [cord]: parseInt(result[0])}},
      ))
  }
  return <div className="points-in-space">
    <ExportToCSV csvFrom={() => JSON.stringify(dataCube)} fileName={'savePoints.json'} enable={true} />
    <input type="file" onChange={async e => {
      const file = e.target.files
      if (file) {
        const result = await loadFile(file[0])
        dispatch(TableDataAction.createSetPointsInSpace((JSON.parse(result[1]))))
      }
    }}/>
    {filesMetaData.map(i => <div key={i.fileName} className="data-Cube-item">
      <span>{i.pseudonym}</span>
      <input type="text" className="position-point xInput"
        value={dataCube[i.pseudonym] ? dataCube[i.pseudonym].x : 0}
        onChange={editDateCube(i.pseudonym, 'x')}
      />
      <input type="text" className="position-point yInput"
        value={dataCube[i.pseudonym] ? dataCube[i.pseudonym].y : 0}
        onChange={editDateCube(i.pseudonym, 'y')}
      />
      <input type="text" className="position-point zInput"
        value={dataCube[i.pseudonym] ? dataCube[i.pseudonym].z: 0}
        onChange={editDateCube(i.pseudonym, 'z')}
      />
    </div>)}
    {Object.keys(dataCube).length
      ? <Chart3D
        data={[pointsPositionForPlot3D(dataCube)]}
        type="scatter3d"
        mode="text+markers"
        title="Точки замеров"
        height={1024}
        width={1024}
      />
      : null}
  </div>
}