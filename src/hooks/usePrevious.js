import { useEffect, useRef } from 'react'

const usePrevious = (value) => {
  const previous = useRef()

  useEffect(() => {
    previous.current = value
  }, [value])

  return previous.current
}

export { usePrevious }
