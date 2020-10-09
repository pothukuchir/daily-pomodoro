import { Draggable } from '@fullcalendar/interaction'
import React, { Component } from 'react'
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import meeting from '../Assets/hangouts-meet.png'
import work from '../Assets/analytics.png'


export class External extends Component {
    constructor(props) { 
        super(props); 
      
        // Setting up state 
        this.state = { 
          userInput : "", 
          list:[] 
        } 
    }

    // Set a user input value
    updateInput(value){
        this.setState({
            userInput: value,
        });
    }

    // Add item if user input is not empty
    addItemMeetWith(){
        if(this.state.userInput!==''){
            const userInput = {
                id: Math.random(),
                value: 'Meet with ' + this.state.userInput
            };

            // Update list
            const list = [...this.state.list];
            
            console.log(userInput.value)
            list.push(userInput);

            // reset
            this.setState({
                list,
                userInput: ""
            });
        }
    }

    // Add item if user input is not empty
    addItemWorkOn(){
        if(this.state.userInput!==''){
            const userInput = {
                id: Math.random(),
                value: 'Work on ' + this.state.userInput
            };

            // Update list
            const list = [...this.state.list];
            
            console.log(userInput.value)
            list.push(userInput);

            // reset
            this.setState({
                list,
                userInput: ""
            });
        }
    }

    render() {
        return (
            <div id="external-events">
                <h4>Add events</h4>
                    {this.state.list.map(item => {return(
                            <div className='fc-custom fc-event fc-h-event fc-daygrid-event fc-daygrid-block-event' key={item.value}>
                                <div className='fc-event-main'>{item.value}</div>
                            </div>

                    )})}
                     
               
                <InputGroup className="mb-1"> 
                    
                        <FormControl 
                            placeholder="add item . . . "
                            size="sm"
                            value = {this.state.userInput} 
                            onChange = {item => this.updateInput(item.target.value)} 
                            aria-label="add something"
                            aria-describedby="basic-addon2"
                        /> 
                    
                </InputGroup> 
                
                    <img src={meeting} height={20} width={20} alt="meeting"/>
                    <Button 
                    variant="dark"
                    size="sm"
                    onClick = {()=>this.addItemMeetWith()} 
                    > 
                    Meet with 
                    </Button> 
                
                
                <div id="button2">
                    <img src={work} height={20} width={20} alt="meeting"/>
                    <Button 
                    variant="dark"
                    size="sm"
                    onClick = {()=>this.addItemWorkOn()} 
                    > 
                    Work on 
                    </Button> 
                </div>
                
            </div>
        )
    }
   componentDidMount(){
        let draggableEl = document.getElementById('external-events');
        new Draggable(draggableEl, {
            itemSelector: '.fc-event',
            eventData: function(eventEl) {
              return {
                title: eventEl.innerText
              };
            }
          });
   }
}

export default External
