import React, { useState, useEffect, useRef } from 'react';
import './Timer.css'


function Timer() {
    const [seconds, setSeconds] = useState(0);
    const [isTimerRunning, setIsTimerRunning] = useState(false);

    useEffect(() => {
        let timer; 

        if(isTimerRunning){
            timer = setInterval(() => {
                setSeconds(Math.round((seconds + 0.1) * 10)/10);
            }, 100);
        }
        return () => clearInterval(timer)
    });

    const startTimer = () => {
        setIsTimerRunning(!isTimerRunning);
    };

    return(
        <div className='Timer'>
            <h1>Number of seconds is {seconds}</h1>
            <button onClick={startTimer}>Start</button>

            <div className='donut'>
                <Arc />
                <Arc />
            </div>
        </div>
    )
}

export default Timer;


function Arc() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
    
        // Parameters for the arc
        const centerX = 250;
        const centerY = 250;
        const radius = 100;
        const startAngle = Math.PI / 2; // Start from bottom (6 o'clock) 
        const endAngle = 1 * Math.PI; // End at 3/4 of the circle (9 o'clock)
        const counterClockwise = false;
    
        // Draw the arc
        context.strokeStyle = "red";
        context.lineWidth = 5;
    
        context.beginPath();
        context.arc(centerX, centerY, radius, startAngle, endAngle, counterClockwise);
        context.stroke();
      }, []);

      return <canvas ref={canvasRef} width = "500" height="500" />
}