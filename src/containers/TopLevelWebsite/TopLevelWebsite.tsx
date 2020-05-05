import * as React from "react";
import { CandlestickResults } from "../../components/CandlestickPlot"
import Button from 'react-bootstrap/Button'
import { API, graphqlOperation } from "aws-amplify";
import { getAuth } from "../../graphql/queries";
import { ISTOPWebsite } from "../SearchContainer/iSTOPWebsite/iSTOPWebsite";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

interface TopLevelProps {

}

interface TopLevelState {
    mode: number
    curpw:string
    errorMessage:string
}


export class TopLevelWebsite extends React.Component<TopLevelProps, TopLevelState> {
    constructor(props) {
        super(props)
        this.state = {
            mode:0,
            curpw:"",
            errorMessage:"",
        }
    }

    setMode = (mode) => {
        return (e) => {
            if(mode === 2) {
                API.graphql(graphqlOperation(getAuth, {
                    id:this.state.curpw
                })).then(result => {
                    if(result.data.getAuth) {
                        this.setState(prevState => {
                            return {
                                ...prevState,
                                mode:mode,
                                errorMessage:""
                            }
                        })
                    } else {
                        this.setState(prevState => {
                            return {
                                ...prevState,
                                errorMessage:"Invalid password"
                            }
                        })
                    }
                }).catch(err => {
                    console.log(err)
                    this.setState(prevState => {
                        return {
                            ...prevState,
                            errorMessage:"Invalid password"
                        }
                    })
                })
            } else {
                this.setState(prevState => {
                    return {
                        ...prevState,
                        mode:mode,
                        errorMessage:""
                    }
                })
            }
        }
    }

    textAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        var curPW = e.target.value ? e.target.value : ""
        this.setState(prevState => {
          return {
            ...prevState,
            curpw: curPW,
            errorMessage:""
          }
        })
      }

    render() {
        console.log('-------')
        console.log('-------')
        var toDisplay = <div></div>;
        console.log("mode2: "+this.state.mode)
        if (this.state.mode == 0) {
            toDisplay = 
                <div className="overallContainer">
                        <Button onClick={this.setMode(1)}>Go to istop</Button>
                        
                        <br/>
                        <br/>
                        The Lollipop Query is password protected. Please enter the password.
                        <br/>
                        <textarea value={this.state.curpw} onChange={this.textAreaChange}/>
                        <br/>
                        <Button onClick={this.setMode(2)}>Go to lollipop query</Button>
                        <br/>
                        {this.state.errorMessage}
                        
                   </div>
        } else if (this.state.mode == 1) {
           toDisplay = 
           <div className="overallContainer">
               <ISTOPWebsite/>
               <Button onClick={this.setMode(0)}>Go back to home page </Button>
           </div>
        } else if (this.state.mode == 2 ) {
           toDisplay = 
           <div className="overallContainer">
               <CandlestickResults/>
               <Button onClick={this.setMode(0)}>Go back to home page </Button>
           </div>
        }
        return (
            <div>
                <Router basename="/">
                    <Switch>
                        <Route exact path="/istop">
                            <ISTOPWebsite/>
                            <Link to="/">
                                <Button onClick={this.setMode(0)}>Go back to home page </Button>
                            </Link>
                        </Route>
                    </Switch>
                    <Switch>
                        <Route exact path="/">
                            <div>{toDisplay}</div>
                        </Route>
                    </Switch>
                </Router>
                
        </div>
        )
    }
}