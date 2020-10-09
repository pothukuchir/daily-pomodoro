import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { createEventId } from './event-utils'
import 'bootstrap/dist/css/bootstrap.css';
import External from './External'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Pomodoro from './Pomodoro/Pomodoro'

export default class DemoApp extends React.Component {

  constructor(){
    super()
    this.state = {
      timerId: 0,
      timerRunning: false,
      currentTime: "25 : 00",
      cycle: "Session",
      workTime: 25,
      breakTime: 5,
      sound: "on"    
    }
  }

  render() {
    return (
      <div className='demo-app'>
        {this.renderSidebar()}
        <div className='demo-app-main'>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
            themeSystem='bootstrap'
            initialView='timeGridDay'
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={this.state.weekendsVisible}
            select={this.handleDateSelect}
            eventContent={renderEventContent} // custom render function
            eventClick={this.handleEventClick}
            eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
            defaultTimedEventDuration='00:25:00'
            droppable={true}
            
          />
        </div>
      </div>
    )
  }

  renderSidebar() {
    return (
      <div className='demo-app-sidebar'>
        <Jumbotron>
          <h1>Welcome Ravikant</h1>
        </Jumbotron>
        <div>
          <External/>
        </div>
          <Pomodoro/>
      </div>
    )
  }

  startTimer = (duration) => {
    this.setState({timerRunning:true})
    let time = duration * 60
    let minutes;
    let seconds;
    let runningTimer = setInterval(()=>{
      this.setState({
        timerId: runningTimer
      })
      minutes = Math.floor(time/60)
      seconds = time - minutes*60
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;
      this.setState({currentTime : `${minutes} : ${seconds}`})
      if(time === 0){
        if(this.state.cycle === "Session"){
          this.setState({
            cycle:"Break",
            timerRunning: false
          })
        } else {
          this.setState({
            cycle:"Session",
            timerRunning: false
          })
          clearInterval(this.state.timerId)
          this.startTimer(this.state.workTime)
        }
      }
    }, 1000);
  }

  // Increment and decrement time functions
  incrementWorkTime = () => {
    this.setState({
      workTime: this.state.workTime + 1
    })
  }

  decrementWorkTime = () => {
    this.setState({
      workTime: this.state.workTime - 1
    })
  }

  incrementBreakTime = () => {
    this.setState({
      breakTime: this.state.breakTime + 1
    })
  }

  decrementBreakTime = () => {
    this.setState({
      breakTime: this.state.breakTime - 1
    })
  }


  setSound = (sound) => {
    this.setState({
      sound: sound
    })
  }

  handleWeekendsToggle = () => {
    this.setState({
      weekendsVisible: !this.state.weekendsVisible
    })
  }

  handleDateSelect = (selectInfo) => {
    let title = prompt('Please enter a new title for your event')
    let calendarApi = selectInfo.view.calendar

    let endTime = new Date(selectInfo.startStr)
    endTime.setMinutes(endTime.getMinutes() + 25)
    console.log(endTime)

    calendarApi.unselect() // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: endTime,
        allDay: selectInfo.allDay
      })
      
    }
  }



  handleEvents = (events) => {
    this.setState({
      currentEvents: events
    })
  }

}

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  )
}


