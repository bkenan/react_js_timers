import React from 'react';


export class XY extends React.Component {
    state = {
        isOn: false, //defining whether the timer is on or off. Initially it's off
        timePassed: 1 * 60, //Please, make this value = to the XY time value as initial setup. It shows working time
        xyTime: 1 * 60, //The time assigned to each period. In this case 1 minute
        currentRound: 1, //We start from round 1
        totalRounds: 10 //The number of total rounds
    };

    //Preparing the minutes, seconds and round number that will appear in the browser for the users

    numMin() {
        return ("0" + Math.floor((this.state.timePassed % 3600) / 60)).slice(-2);
    }

    numSec() {
        return ("0" + (this.state.timePassed % 60)).slice(-2);
    }

    numRound() {
        return ("Round: " + this.state.currentRound)
    }

    //This function defines the start button. The timer is on now. As long as the actual time passed is
    //higher than 0, we will deduct 1 second from our timer. When the current time reaches to 0, we add 1 to our existing rounds
    //and set our actual time value back to the original cap. This process continues until the number of current rounds becomes =
    // to the total rounds. At that time I deducted 1 from the current rounds in orde to keep the balance as the process continued to add rounds.
    //We then set our actual time to 0 and close the timer

    startTime = () => {
        this.setState({ isOn: true });

        this.interval = setInterval(() => {
            if (this.state.timePassed % 3600 > 0) {
                this.setState(({ timePassed }) => ({
                    timePassed: timePassed - 1,
                }));
            }
            if (this.state.timePassed % 3600 === 0) {
                this.setState({
                    currentRound: this.state.currentRound + 1,
                    timePassed: this.state.xyTime
                });
                if (this.state.currentRound > this.state.totalRounds) {
                    clearInterval(this.interval);
                    this.setState({
                        currentRound: this.state.currentRound - 1,
                        timePassed: 0,
                        isOn: false
                    });
                }
            }
        }, 1000)
    };

    //Reset button simply clears the interval function and returns the state's actual time value back to the original XY value
    resetTime = () => {
        clearInterval(this.interval);
        this.setState({
            timePassed: this.state.xyTime,
            isOn: false,
            currentRound: 1
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

        if (this.state.currentRound === this.state.totalRounds) {
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
                    <h3>XY</h3>
                    <span className="round"> {this.numRound()}/{this.state.totalRounds}</span>
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