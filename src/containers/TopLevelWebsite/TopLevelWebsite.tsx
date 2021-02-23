import * as React from "react";
import { CandlestickResults } from "../../components/CandlestickPlot"
import Button from 'react-bootstrap/Button'
import { API, graphqlOperation } from "aws-amplify";
import { getAuth } from "../../graphql/queries";
import { ISTOPWebsite } from "../SearchContainer/iSTOPWebsite/iSTOPWebsite";

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
            this.setState(prevState => {
                return {
                    ...prevState,
                    mode:mode,
                    errorMessage:""
                }
            })
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

      componentWillMount() {
          console.log("firing will mount")
          if(window.location.href && window.location.href.toLowerCase().includes("istop")){
            this.setState(prevState => {
                return {
                    ...prevState,
                    mode:1
                }
            })
           } else if(window.location.href && window.location.href.toLowerCase().includes("ddr")) {
              this.setState(prevState => {
                return {
                    ...prevState,
                    mode:2
                  }
                })
           }
      }

    render() {
        var toDisplay = <div></div>;
        console.log("mode2: "+this.state.mode)
        if (this.state.mode == 0) {
            toDisplay = 
                <div className="overallContainer">
                        <Button onClick={this.setMode(1)}>Go to istop</Button>
                        
                        <br/>
                        <br/>
                        <Button onClick={this.setMode(2)}>Go to DDR variants query</Button>
                        <br/>
                        {this.state.errorMessage}
                        
                   </div>
        } else if (this.state.mode == 1) {
           toDisplay = 
           <div className="overallContainer">
               <ISTOPWebsite setMode={this.setMode(2)}/>
           </div>
        } else if (this.state.mode == 2 ) {
           toDisplay = 
           <div className="overallContainer">
               <CandlestickResults setMode={this.setMode(1)}/>
           </div>
        }
        return (
                <div>{toDisplay}</div>
        )
    }
}