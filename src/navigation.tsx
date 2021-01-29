import React from 'react'

type NavContext = {
  loadingFiles: boolean,
  tablesData: boolean,
  tempChart: boolean,
  humChart: boolean,
  temp3DChart: boolean,
  hun3DChart: boolean,
  goTo: (page: Pages) => void
}

export type NavPage = Omit<NavContext, 'goTo'>

export type Pages = keyof NavPage

export const NavigatorContext = React.createContext<NavContext>({} as NavContext)

type Props = {
  child: JSX.Element
}

export const ContexNavigator: React.FC<Props> = ({child}) => {
  const [navigator, setNavigator] = React.useState<NavPage>({
    loadingFiles: true,
    tablesData: false,
    tempChart: false,
    humChart: false,
    temp3DChart: false,
    hun3DChart: false,
  }) 
  const goTo = (page: Pages) => {
    const newNavigator = Object.keys(navigator).reduce((acc, item) => {
      if (item === page) return {...acc, [item]: true}
      else return {...acc, [item]: false}
    }, {} as typeof navigator)
    setNavigator(newNavigator)
  }
  return <NavigatorContext.Provider value={{...navigator, goTo}}>
      {child}
    </NavigatorContext.Provider>
}