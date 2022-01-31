import React from 'react';


export class Tabata extends React.Component {
    state = {
        isActive: false, //defining whether the timer is on or off. Initially it's off
        workTime: 20, //The time assigned to Work period. In this case 20 seconds
        currentWork: 20, //Please, make this value = to the work time value as initial setup. It shows working time (for work period)
        restTime: 10, //The time assigned to Rest period. In this case 10 seconds
        currentRest: 0, //Please, make this value = to the rest time value as initial setup. It shows working time (for rest period)
        currentRound: 1, //We start from round 1
        totalRounds: 8 //The number of total rounds
    };

    //Preparing the minutes, seconds and round number that will appear in the browser for the users

    numWorkMin() {
        return ("0" + Math.floor((this.state.currentWork % 3600) / 60)).slice(-2);
    }

    numWorkSec() {
        return ("0" + (this.state.currentWork % 60)).slice(-2);
    }

    numRestMin() {
        return ("0" + Math.floor((this.state.currentRest % 3600) / 60)).slice(-2);
    }

    numRestSec() {
        return ("0" + (this.state.currentRest % 60)).slice(-2);
    }

    numRound() {
        return ("Round: " + this.state.currentRound)
    }

    //This function defines the start button. The timer is on now. As long as the actual time passed is
    //higher than 0 we will deduct 1 second from our timer. When this number reaches to 0 and the actual rest time = 0,
    //we stop our work period and switch to the rest period timer. Here I also added 1 to the the rest time's actual value to keep the balance
    //as it did't capture the full original value initially. The same logic applies to the other way round as well. However, this time we add 1
    //to the current rounds once the rest period ends. We stop the function when the current rounds becomes = to the total rounds

    startTime = () => {
        this.setState({ isActive: true });

        this.interval = setInterval(() => {


            if (this.state.currentWork % 3600 > 0) {
                this.setState(({ currentWork }) => ({
                    currentWork: currentWork - 1,
                }));
            }

            if (this.state.currentWork % 3600 === 0 && this.state.currentRest === 0) {
                this.setState({
                    currentWork: 0,
                    currentRest: this.state.restTime + 1
                });
            }

            if (this.state.currentRest % 3600 > 0) {
                this.setState(({ currentRest }) => ({
                    currentRest: currentRest - 1,
                }));
            }
            if (this.state.currentRest % 3600 === 0 && this.state.currentWork === 0) {
                this.setState({
                    currentWork: this.state.workTime,
                    currentRest: 0,
                    currentRound: this.state.currentRound + 1
                });
            }


            if (this.state.currentRound > this.state.totalRounds) {
                clearInterval(this.interval);
                this.setState({
                    currentRound: this.state.currentRound - 1,
                    currentRest: 0,
                    currentWork: 0,
                    isActive: false
                });
            }

        }, 1000)
    };

    //In order to reset, I set the current work time to the initial countdown value for this parameter. I also set the rest time to 0
    // as it was the case in the beginning, so that only 1 timer works at each period.

    resetTime = () => {
        clearInterval(this.interval);
        this.setState({
            currentRest: 0,
            currentWork: this.state.workTime,
            isActive: false,
            currentRound: 1
        });
    };

    //Pause button just stops the timer at it's current situation. This function sits in the same button with 
    //Start function and as long as the timer works, it's active

    pauseTime = () => {
        clearInterval(this.interval);
        this.setState({ isActive: false });
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
                    <h3>Tabata</h3>
                    <div className="round"> {this.numRound()}/{this.state.totalRounds}</div>
                    <div>
                        <span className="tabata-title"> Work period: <strong className={colorClass}>{this.numWorkMin()}</strong></span>
                        <span className="tabata-time"> <strong className={colorClass}>: {this.numWorkSec()}</strong></span>
                        <span className="tabata-title"> Rest period: <strong className={colorClass}>{this.numRestMin()}</strong></span>
                        <span> <strong className={colorClass}>: {this.numRestSec()}</strong></span>
                    </div>
                </div>
                <div>
                    <button className="btn" onClick={this.state.isActive ? this.pauseTime : this.startTime}>
                        Start / Pause
          </button>
                    <button className="btn reset" onClick={!this.state.isActive ? this.resetTime : null}>
                        Reset
          </button>
                </div>
            </div>
        );
    }
}