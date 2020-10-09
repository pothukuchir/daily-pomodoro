import React, { Component } from 'react'
import BreakInterval from './BreakInterval';
import Timer from './Timer';
import SessionLength from './SessionLength';

export class Pomodoro extends Component {
    constructor(){
      super();
      this.state = {
        breaklength: 5,
        sessionlength: 25,
        timerMinute: 25
      }
  
      // We need to bind onIncreaseBreakLength since we are using this inside a function
      this.onIncreaseBreakLength = this.onIncreaseBreakLength.bind(this);
      this.onDecreaseBreakLength = this.onDecreaseBreakLength.bind(this);
      this.onIncreaseSessionLength = this.onIncreaseSessionLength.bind(this);
      this.onDecreaseSessionLength = this.onDecreaseSessionLength.bind(this);
      this.onUpdateTimerMinute = this.onUpdateTimerMinute.bind(this);
      this.onToggleInterval = this.onToggleInterval.bind(this);
    }
  
    onIncreaseSessionLength(){
      this.setState((prevState)=>{
        return {
          sessionlength: prevState.sessionlength + 1,
          timerMinute: prevState.sessionlength + 1
        }
      })
    }
  
    onDecreaseSessionLength(){
      this.setState((prevState)=>{
        return {
          sessionlength: prevState.sessionlength - 1,
          timerMinute: prevState.sessionlength - 1
        }
      })
    }
  
    onIncreaseBreakLength(){
      this.setState((prevState) => {
        return {
          breaklength: prevState.breaklength + 1
        }
      })
    }
    
    onDecreaseBreakLength(){
      this.setState((prevState) => {
        return {
          breaklength: prevState.breaklength - 1
        }
      })
    }
  
    onUpdateTimerMinute(){
      this.setState((prevState)=>{
        return{
          timerMinute: prevState.timerMinute - 1
        }
      })
    }
  
    onToggleInterval(isSession){
      if(isSession){
        this.setState({
          timerMinute: this.state.sessionlength
        })
      } else {
        this.setState({
          timerMinute: this.state.breaklength
        })
      }
    }
  
    render(){
      return (
        <main>
          <h5 className="timer-title">Pomodoro Clock</h5>
          <section className="interval-length-container">
            <BreakInterval 
              breakInterval = {this.state.breaklength} 
              increaseBreak = {this.onIncreaseBreakLength}
              decreaseBreak = {this.onDecreaseBreakLength}
            />
            <SessionLength 
              sessionInterval = {this.state.sessionlength} 
              increaseSession = {this.onIncreaseSessionLength}
              decreaseSession = {this.onDecreaseSessionLength}
            />
          </section>
          <Timer 
            timerMinute={this.state.timerMinute} 
            breakLength={this.state.breaklength}
            updateTimerMinute={this.onUpdateTimerMinute}
            toggleInterval={this.onToggleInterval}
          />
        </main>
      )
    }
  }

export default Pomodoro
