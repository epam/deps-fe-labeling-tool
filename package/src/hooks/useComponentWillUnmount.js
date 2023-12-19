import { useEffect, useRef } from 'react'

const useComponentWillUnmount = (callback = () => {}) => {
  const callbackRef = useRef(callback)
  callbackRef.current = callback
  useEffect(() => () => callbackRef.current(), [])
}

export { useComponentWillUnmount }
