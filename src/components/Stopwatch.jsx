import { useState, useRef, useEffect } from 'react'

const Stopwatch = ({getNewScramble}) => {
  const [time, setTime] = useState(0)
  const [showDots, setShowDots] = useState(false)
  const intervalRef = useRef(null)
  const isRunningRef = useRef(false)


  const formatTime = (time) => {
    const milliseconds = Math.floor(time % 1000).toString().padStart(3, '0')
    const seconds = Math.floor((time / 1000) % 60).toString().padStart(2, '0')
    const minutes = Math.floor((time / (1000 * 60)) % 60).toString().padStart(2, '0')
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24).toString().padStart(2, '0')
    if(hours == 0 && minutes == 0){
        return `${seconds}.${milliseconds}`
        
    }else if(hours == 0 && minutes > 0){
        return `${minutes}:${seconds}.${milliseconds}`
    }
    else if(hours > 0 && minutes == 0){
        return `${hours}:00:${seconds}.${milliseconds}`
    }
    return `${hours}:${minutes}:${seconds}.${milliseconds}`
  }

  const startStopwatch = () => {
    if (!isRunningRef.current) {
      const startTime = Date.now() - time
      intervalRef.current = setInterval(() => {
        setTime(Date.now() - startTime)
      }, 10) 

      isRunningRef.current = true
    }

  }

  const stopStopwatch = () => {

    if (isRunningRef.current) {
        
      clearInterval(intervalRef.current)
      isRunningRef.current = false


    }
  }

  const resetStopwatch = () => {
    clearInterval(intervalRef.current)
    setTime(0)
    isRunningRef.current = false
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown, true)
    document.addEventListener('keyup', handleKeyUp, true)
  
    return () => {
      document.removeEventListener('keydown', handleKeyDown, true)
      document.removeEventListener('keyup', handleKeyUp, true)
    }
  }, [])
  
  let timeoutId
  let isPressedLongEnough = false
  
  const handleKeyDown = (e) => {
    setShowDots(true)
    if (e.key === " " && !isRunningRef.current && !timeoutId ) {
      timeoutId = setTimeout(() => {
        setShowDots(false)
        isPressedLongEnough = true
        
      }, 500)
    }else{
        setShowDots(false)
        stopStopwatch()
    } 
  }
  
  const handleKeyUp = (e) => {
    setShowDots(false)
    if (e.key === " ") {
      clearTimeout(timeoutId)
      timeoutId = null
      if (isPressedLongEnough && !isRunningRef.current) {
        setShowDots(false)
        resetStopwatch()
        startStopwatch()
        getNewScramble()
      }

      isPressedLongEnough = false
    }
  }
  

  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='font-mono text-5xl font-medium text-center mt-52'>{formatTime(time)}</div>
      {showDots ? <h1 className='font-mono text-6xl font-medium text-center '>...</h1> : ""}
      <div>

      </div>
    </div>
  )
}

export default Stopwatch
