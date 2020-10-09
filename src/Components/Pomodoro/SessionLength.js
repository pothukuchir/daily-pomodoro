import React from 'react'

export default function sessionLength(props) {

    function increaseCounter(){
        if(props.sessionInterval === 90){
            return;
        }
        props.increaseSession();
    }

    function decreaseCounter(){
        if(props.sessionInterval === 1){
            return;
        }
        props.decreaseSession();
    }
    return (
        <section>
            <p className="break-session-text">Session Length</p>
            <section className="interval-container">
                <button className="timer-button" onClick={decreaseCounter}>-</button>
                <p className="interval-length">{props.sessionInterval}</p>
                <button className="timer-button" onClick={increaseCounter}>+</button>
            </section>
        </section>
        
    )
}
