import React, { Component } from 'react'

export class timer extends Component {
    constructor(){
        super();
        this.state = {
            isSession: true,
            timerSecond: 0,
            intervalId: 0  
        }
        this.play = this.play.bind(this)
        this.decreaseTimer = this.decreaseTimer.bind(this)
        this.stop = this.stop.bind(this)
    }
    play(){
        let intervalId = setInterval(this.decreaseTimer, 1000)

        this.setState({
            intervalId: intervalId
        })
    }
    stop(){
        clearInterval(this.state.intervalId)
    }
    decreaseTimer(){
        switch(this.state.timerSecond){

            case 0:
                this.props.updateTimerMinute()
                this.setState({
                    timerSecond: 59
                })
                break;
            default:
                this.setState((prevState)=>{
                    return {
                        timerSecond: prevState.timerSecond - 1
                    }
                })
                break;
        }
    }

    render() {
        return (
            <section>
                <section className="timer-container">
                    <p>{this.state.isSession === true ? "Session":"Break"}</p>
                    <span className="timer">{this.props.timerMinute}</span>
                    <span className="timer">:</span>
                    <span className="timer">{this.state.timerSecond === 0? "00" : 
                    this.state.timerSecond < 10 ? "0" + 
                    this.state.timerSecond: this.state.timerSecond}</span>
                </section> 
                <section className="timer-actions">
                    <button className="timer-button" onClick={this.play}>Play</button>
                    <button className="timer-button" onClick={this.stop}>Stop</button>
                    <button className="timer-button">Refresh</button>
                </section>
            </section>
            
              
            
        )
    }
}

export default timer
