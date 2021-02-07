import React from 'react'
import './exportToCSV.scss'
import {prepareDataForDownload} from '../../utils/loadUpload'

type Props = {
  csvFrom: () => string,
}

export const ExportToCSV: React.FC<Props> = ({csvFrom}) => {
  const [downloadDta, setDownloadData] = React.useState('')
  const aref = React.useRef(null)
  return <>
    <button className='create-export' onClick={() => {
      const text = csvFrom()
      const result = text ? prepareDataForDownload(text) : ''
      setDownloadData(result)
    }}>
      Экспорт в csv
    </button>
    {downloadDta ? <a className="termo-map" download="termo_map.csv" href={downloadDta} ref={aref}>
      termo_map
    </a> : null}
  </>
}
