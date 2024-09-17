import { useState, useRef, useEffect } from 'react'

const Stopwatch = () => {
  const [time, setTime] = useState(0)
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
    document.addEventListener('keydown', detect, true)
  }, [])
  
  const detect = (e) => {
    if(e.key === " "){
        if(!isRunningRef.current){
            startStopwatch()
            console.log(isRunningRef.current)
            
        }else{
            stopStopwatch()
            console.log(isRunningRef.current)
        }
        console.log(isRunningRef.current)
        
      
    }
  }

  return (
    <div>
      <div className='font-mono text-5xl font-medium text-center mt-52'>{formatTime(time)}</div>
      <div>

      </div>
    </div>
  )
}

export default Stopwatch
