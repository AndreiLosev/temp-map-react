import React from 'react'
import './exportToCSV.scss'
import {prepareDataForDownload} from '../../utils/loadUpload'

type Props = {
  csvFrom: () => string,
  fileName: string,
  enable: boolean,
}

export const ExportToCSV: React.FC<Props> = ({csvFrom, fileName, enable}) => {
  const [downloadDta, setDownloadData] = React.useState('')
  const aref = React.useRef(null)
  return <div className="ExportToCSV__wrapp">
    <button className='create-export' disabled={!enable} onClick={() => {
      if (enable) {
        const text = csvFrom()
        const result = text ? prepareDataForDownload(text) : ''
        setDownloadData(result)
      }
    }}>
      Экспорт в csv
    </button>
    {downloadDta ? <a className="termo-map" download={`${fileName}`} href={downloadDta} ref={aref}>
      {`${fileName}`}
    </a> : null}
  </div>
}
