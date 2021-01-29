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
