type Year = number
type Munth = number
type Day = number
type Hours = number
type Minuts = number 

export const myDatePars = (date: string): [Year, Munth, Day, Hours, Minuts] => {
  const [dateS, timeS] = date.split(' ')
  const dateArrS = dateS.split('.')
  const timeArrS = timeS.split(':')
  const year =  parseInt(dateArrS[2]) as Year
  const month = parseInt(dateArrS[1]) - 1 as Munth
  const day = parseInt(dateArrS[0]) as Day
  const hours = parseInt(timeArrS[0]) as Hours
  const minuts = parseInt(timeArrS[1]) as Minuts
  return [year, month, day, hours, minuts]
}

export const roundIn10 = (value: number) => {
  return Math.round(value * 10) / 10
}