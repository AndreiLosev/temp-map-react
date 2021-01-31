import { findByMainData, MainData } from "./mainData"

export const loadFile = (file: File) => new Promise<[string, string]>((resolev, reject) => {
  const name = file.name
  const reader = new FileReader()
  reader.onload = () => {
    const result = reader.result?.toString()
    if (result) resolev([name, result])
    else throw new Error(`File ${name} read error`)
  }
  reader.onerror = () => {
    reject(reader.error)
  }
  reader.readAsText(file)
})

export const prepareDataForDownload = (text: string) => {
  const type = 'data:text/plain;charset=utf-8,'
  return type + encodeURIComponent(text);
}

export const csvFromMainData = (mainData: MainData, period: {start: number, end: number}) => {
  const keys = Object.keys(mainData)
  if (keys.length > 0) {
    const step = keys.reduce((step, i) => {
      if (mainData[i].get(period.start)) {
        const keys = Array.from(mainData[i].keys())
        return keys[1] - keys[0]
      }
      return step
    }, 0)
    const result = ['date time;' + keys.join(';') + ';;;' + keys.join(';')]
    for (let i = period.start; i <= period.end; i += step) {
      const inThisTime = keys.map(key => findByMainData(mainData[key], i))
      const temp = inThisTime.map(item => item.temperature.toString().replace('.', ','))
      const hum = inThisTime.map(item => item.humidity.toString().replace('.', ','))
      const row = new Date(i).toLocaleString() + ';' +
        temp.join(';') + ';;;' + hum.join(';')
      result.push(row)
    }
    return result.join('\n')
  }
  return ''
}
