import React from "react";

export default class MyForm extends React.Component {
    state = {
        name: "",
        date: "",
        dateNow: new Date().getTime(),
        days: '',
        hours: '',
        minutes: '',
        seconds: '',
        alertName: '',
        alertDate: '',
        default: 'Default',
        reward: false,
        interval: ''
    };


    handleChange = event => {
        this.setState({
            name: event.target.value,
            alertName: '',
        });
    }

    handleDate = event => {
        this.setState({
            date: event.target.value,
            alertDate: ''
        })
    }

    showReward = () => {
        return (
            <div className="">
                <p>Your Reward</p>
                <a href="https://drive.google.com/drive/u/0/folders/1XaQMFUYTOMLvyvMQLKZvlVz6KrQTUUBL">
                    <button className="btn btn-success pr-3 pl-3">
                        CLAIM
                    </button>
                </a>
            </div>
        );
    } 

    

    countDown = () => {
            var dateFor = new Date(this.state.date).getTime();

            var birthday = dateFor - new Date().getTime();

            var second = 1000;
            var minute = second * 60;
            var hour = minute * 60;
            var day = hour * 24;

            this.setState({
                days: Math.floor(birthday / day),
                hours: Math.floor(((birthday % day) /hour) - 7),
                minutes: Math.floor((birthday % hour) / minute),
                seconds: Math.floor((birthday % minute) / second),
            })

            console.log(birthday)

            if(birthday === 0) {
                this.setState({
                    reward: true,
                    default: "Reward"
                }); 
            }    
    }

    interval = () => {
        setInterval(() => {
            if(this.state.reward) {
                clearInterval(this.interval)
            }else {
                this.countDown()
            }
        },1000)
    }


    clickSubmit = () => {
        if(this.state.name === "" || this.state.date === "") {
            console.log("No value")
            this.setState({
                alertName: 'Please input your name',
                alertDate: 'Date is required'
            })
        } else {
            this.countDown()
            this.interval()
            this.setState({
                default: "Count"
            })
            
        } 
    } 

    render() { 
            if(this.state.default === "Default") {
                return (
                    <div className="bg-container">
                        <div className="form-class text-white" style={{
                            marginTop: "-150px"
                        }}>
                            <h2 className="text-white" >INFORMATION</h2>
                            <div className="form-group">
                                <label>Name:</label>
                                <input className="form-control mb-3" value={this.state.name} onChange={this.handleChange} placeholder="Enter Your Name" />
                                <small style={{
                                    color: 	"#FF0000",
                                    background: "#FFFFFF"
                                }}>{this.state.alertName}</small>
                            </div>
                            <div className="form-group">
                                <label>Date Birth:</label>
                                <input type="date" value={this.state.date} onChange={this.handleDate} className="form-control mb-3" />
                                <small style={{
                                    color: 	"#FF0000",
                                    background: "#FFFFFF"
                                }}>{this.state.alertDate}</small>
                            </div>
                            
                
                            <button className="btn btn-success" onClick={this.clickSubmit}>Submit</button>
                        </div>
                    </div>
                )
            }else if(this.state.default === "Count") {
                return (
                    <div>
                    <div className="bg-container">
                        <div className="text-white text-center down-count">
                            <div className="count-down mr-4 " >
                                <h1 >{this.state.days}</h1>
                                <h2>DAYS</h2>
                            </div>
                            <div className="count-down mr-4">
                                <h1>{this.state.hours}</h1>
                                <h2>HOURS</h2>
                            </div>
                            <div className="count-down mr-4">
                                <h1>{this.state.minutes}</h1>
                                <h2>MINUTES</h2>
                            </div>
                            <div className="count-down mr-4">
                                <h1>{this.state.seconds}</h1>
                                <h2>SECONDS</h2>
                            </div>
                            
                        </div>
                        
                    </div>
                    
                </div>
                    
                )
            }else if(this.state.default === "Reward"){
                return (
                    <div>
                        <div className="reward-container">
                            <h1>HAPPY  BIRTHDAY </h1>
                            <h1 style={{
                                marginBottom: "50px",
                            }}>{this.state.name}</h1>
                            <img style={{
                                width: "300px",
                                height: "200px",
                            }} src="https://media.giphy.com/media/g5R9dok94mrIvplmZd/giphy.gif" alt="" /> 
                            {this.state.reward && this.showReward()}
                        </div>
                         
                    </div>
                )
            }

        return null;
    }
}

