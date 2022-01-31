import React from 'react';


export class Countdown extends React.Component {
    state = {
        isOn: false, //defining whether the timer is on or off. Initially it's off
        timePassed: 2.5 * 60, //Please, make this value = to the countdown value as initial setup. It shows working time
        countdown: 2.5 * 60 //this is the cap for this timer. In this case 2 minutes and 30 seconds
    };

    //Preparing the minutes and seconds that will appear in the browser for the users

    numMin() {
        return ("0" + Math.floor((this.state.timePassed % 3600) / 60)).slice(-2);
    }

    numSec() {
        return ("0" + (this.state.timePassed % 60)).slice(-2);
    }

    //This function defines the start button. The timer is on now. As long as the actual time passed is
    //higher than 0, we will deduct 1 second from our timer. This continues until the actual time  = 0.
    //At that time the timer becomes off.

    startTime = () => {
        this.setState({ isOn: true });

        this.interval = setInterval(() => {
            if (this.state.timePassed % 3600 > 0) {
                this.setState(({ timePassed }) => ({
                    timePassed: timePassed - 1
                }));
            }
            if (this.state.timePassed === 0) {
                this.setState({
                    timePassed: 0,
                    isOn: false
                });
            }
        }, 1000)
    };

    //Reset button simply clears the interval function and returns the state's actual time value back to the original countdown value
    resetTime = () => {
        clearInterval(this.interval);
        this.setState({
            timePassed: this.state.countdown,
            isOn: false
        });
    };

    //Pause button just stops the timer at it's current situation. This function sits in the same button with 
    //Start function and as long as the timer works, it's active

    pauseTime = () => {
        clearInterval(this.interval);
        this.setState({ isOn: false });
    };

    render() {

        //Setting the colors for the timer depending on it's behavior

        let timeOver = "red";
        let timeOn = "green";
        let colorClass;

        if (this.state.timePassed === 10) {
            colorClass = timeOver;
        } else {
            colorClass = timeOn;
        }
        //Printing the results on html
        //the butttons below depend on the timers activity. If it's active, then pause button becomes active, otherwise both start
        //and reset buttons are active. In case of original situation, only start button works as there's nothing to do for the reset button. 
        //After timer starts to work, reset button becomes active immediately.
        return (
            <div className="main">
                <div className="timer">
                    <h3>Countdown</h3>
                    <div className={colorClass}>
                        <span> <strong>{this.numMin()}</strong></span>
                        <span> <strong>: {this.numSec()}</strong></span>
                    </div>
                </div>
                <div>
                    <button className="btn" onClick={this.state.isOn ? this.pauseTime : this.startTime}>
                        Start / Pause
                    </button>
                    <button className="btn reset" onClick={!this.state.isOn ? this.resetTime : null}>
                        Reset
                    </button>
                </div>
            </div>
        );
    }
}