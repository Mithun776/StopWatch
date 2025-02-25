import { useState, useEffect, useRef } from 'react'

function Stopwatch() {

    // State to manage whether the stopwatch is running or not
    const [isRunning, setIsRunning] = useState(false)
    
    // State to keep track of the elapsed time in milliseconds
    const [elapsedTime, setElapsedTime] = useState(0)
    
    // useRef to store the interval ID, which is necessary for clearing the interval later
    const intervalIdRef = useRef(null)
    
    // useRef to store the starting time so we can calculate elapsed time accurately when resumed
    const startTimeRef = useRef(0)

    // Effect to manage the stopwatch timer
    useEffect(() => {
        // When the stopwatch is running, start updating the elapsed time
        if(isRunning){
            intervalIdRef.current = setInterval(() => {
                // Update elapsed time based on the current time and the start time
                setElapsedTime(Date.now() - startTimeRef.current)
            }, 10) // Update every 10 milliseconds
        }

        // Cleanup effect: clear the interval when the component is unmounted or when stopwatch stops
        return () => {
            clearInterval(intervalIdRef.current)
        }

    }, [isRunning]) // Runs the effect whenever `isRunning` changes

    // Start the stopwatch and set the reference for the start time
    function start() {
        setIsRunning(true) // Set stopwatch to running
        startTimeRef.current = Date.now() - elapsedTime // Adjust start time so it continues from where it left off
    }

    // Stop the stopwatch
    function stop() {
        setIsRunning(false) // Set stopwatch to stopped
    }

    // Reset the stopwatch to 0 and stop it
    function reset() {
        setElapsedTime(0) // Reset the elapsed time to 0
        setIsRunning(false) // Stop the stopwatch
    }

    // Format the elapsed time as MM:SS:MS (minutes:seconds:milliseconds)
    function formatTime() {
        // Calculate minutes, seconds, and milliseconds from elapsed time in milliseconds
        let minutes = Math.floor(elapsedTime / (1000 * 60) % 60)
        let seconds = Math.floor(elapsedTime / (1000) % 60)
        let milliseconds = Math.floor(elapsedTime % 1000 / 10)
        
        // Pad minutes, seconds, and milliseconds to always show 2 digits
        minutes = String(minutes).padStart(2, "0")
        seconds = String(seconds).padStart(2, "0")
        milliseconds = String(milliseconds).padStart(2, "0")
        
        // Return the formatted time as a string
        return `${minutes}:${seconds}:${milliseconds}`
    }

    return (
        <div className='stopwatch'>
            {/* Display the formatted time */}
            <div className='display'>{formatTime()}</div>
            
            {/* Controls for starting, stopping, and resetting the stopwatch */}
            <div className='controls'>
                <button className='start-button' onClick={start}>Start</button>
                <button className='stop-button' onClick={stop}>Stop</button>
                <button className='reset-button' onClick={reset}>Reset</button>
            </div>
        </div>
    )
}

export default Stopwatch
