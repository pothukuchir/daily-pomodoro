import React from 'react'

export default function breakInterval(props) {

    function decreaseCounter(){
        if(props.breakInterval===1){
            return;
        }
        props.decreaseBreak();
    }

    function increaseCounter(){
        if(props.breakInterval===60){
            return; 
        }
        props.increaseBreak();
    }

    return (
        <section>
            <p className="break-session-text">Break Length</p>
            <section className="interval-container">
                <button className="timer-button" onClick={decreaseCounter}>-</button>
                <p className="interval-length">{props.breakInterval}</p>
                <button className="timer-button" onClick={increaseCounter}>+</button>
            </section>
        </section>
        
    )
}
