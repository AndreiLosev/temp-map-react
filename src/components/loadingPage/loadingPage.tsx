import React from 'react'
import cn from 'classnames'

export const LoadingPage = () => {
  const refIn = React.useRef<HTMLInputElement>(null)
  return <div className={cn('loadingPage')}>
    <input type="file" multiple={true} ref={refIn} onMouseUp={() => console.log('hello')}/>
    <input type="button" value="XXXX" onMouseDown={() => {
      if (refIn.current) {
        refIn.current.focus()
      }
    }} />
  </div>
}