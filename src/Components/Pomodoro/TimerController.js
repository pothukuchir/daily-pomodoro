import React, { Component } from 'react'
import BreakController from './BreakController'
import WorkController from './WorkController'

export class TimerController extends Component {
    render() {
        return (
            <div className="timer-controller">
                <WorkController/>
                <BreakController/>
            </div>
        )
    }
}

export default TimerController
