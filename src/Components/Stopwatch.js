import React from 'react';

export class Stopwatch extends React.Component {

    state = {
        isOn: false, //defining whether the timer is on or off. Initially it's off
        timePassed: 0, //this is the number of seconds that have actually passed in the timer. Initially, it's 0
        timeCap: 2.5 * 60 //this is the cap for this timer. In this case 2 minutes and 30 seconds
    };

    //Preparing the minutes and seconds that will appear in the browser for the users

    numMin() {
        return ("0" + Math.floor((this.state.timePassed % 3600) / 60)).slice(-2);
    }

    numSec() {
        return ("0" + (this.state.timePassed % 60)).slice(-2);
    }

    //This function defines the start button. The timer is on now. As long as the actual time passed is
    //lower than the time cap, we will add 1 second to our timer. This continues until the cap is achieved.
    //At that time the timer becomes off.
    startTime = () => {
        this.setState({ isOn: true });

        this.interval = setInterval(() => {
            if (this.state.timePassed < this.state.timeCap) {
                this.setState(({ timePassed }) => ({
                    timePassed: timePassed + 1
                }));
            }
            if (this.state.timePassed === this.state.timeCap) {
                this.setState({
                    isOn: false
                });
            }
        }, 1000);
    };

    //Reset button simply clears the interval function and returns the state's actual time value back to 0
    resetTime = () => {
        clearInterval(this.interval);
        this.setState({
            timePassed: 0,
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

        if (this.state.timePassed > this.state.timeCap - 10) {
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
                    <h3>Stopwatch</h3>
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