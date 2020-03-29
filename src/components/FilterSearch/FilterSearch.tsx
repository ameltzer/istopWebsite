import * as React from "react";  

export interface FilterSearchProps {
  setFilterState: (FilterSearchState) => void
}
  
export interface FilterSearchState {
  show:Boolean
  nmdPrediction: boolean
  rflpAssay: boolean
  upstreamG: boolean
  offTargetPrediction: boolean
  pam: Map<string, boolean>
}
  
  
  export class FilterSearch extends React.Component<FilterSearchProps, FilterSearchState> {

      constructor(props) {
        super(props);
        this.state = {
          show: false,
          nmdPrediction: false,
          rflpAssay: false,
          upstreamG: false,
          offTargetPrediction: false,
          pam: new Map([
            ['sgNGG',false],
            ['sgNGA',false],
            ['sgNGCG',false],
            ['sgNGAG',false],
            ['sgNNGRRT',false],
            ['sgNNNRRT',false],
          ])
        }
      }
  
      handleSubmit = (e) => {
        this.setState(prevState => {
            return {show: !prevState.show}
          }
        )
      }

      updatePAMCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
        var newPam: Map<string, boolean> = this.state.pam
        newPam.set(e.target.name, e.target.checked)

       

        this.setState(prevState => {
          var newFilterState:FilterSearchState = {
            ...prevState,
            pam: newPam
          }
          this.props.setFilterState(newFilterState)
          return newFilterState

        })
      }

      updateNMDPrediction = (e: React.ChangeEvent<HTMLInputElement>) => {
        var newNmdPrediction = e.target.checked;
        this.setState(prevState => {
          var newFilterState:FilterSearchState = {
            ...prevState,
            nmdPrediction: newNmdPrediction
          }
          this.props.setFilterState(newFilterState)
          return newFilterState
        })
      }
  
      updateRflpAssay = (e: React.ChangeEvent<HTMLInputElement>) => {
        var newRflpAssay = e.target.checked;
        this.setState(prevState => {
          var newFilterState:FilterSearchState = {
            ...prevState,
            rflpAssay: newRflpAssay
          }
          this.props.setFilterState(newFilterState)
          return newFilterState
        })
      }

      updateUpstreamG = (e: React.ChangeEvent<HTMLInputElement>) => {
        var newUpstreamG = e.target.checked;
        this.setState(prevState => {
          var newFilterState:FilterSearchState = {
            ...prevState,
            upstreamG: newUpstreamG
          }
          this.props.setFilterState(newFilterState)
          return newFilterState
        })
      }

      updateOffTargetPrediction = (e: React.ChangeEvent<HTMLInputElement>) => {
        var newOffTargetingPrediction = e.target.checked;
        this.setState(prevState => {
          var newFilterState:FilterSearchState = {
            ...prevState,
            offTargetPrediction: newOffTargetingPrediction
          }
          this.props.setFilterState(newFilterState)
          return newFilterState
        })
      }

      render() {
        var PAMFilter = Array.from(this.state.pam, ([key, value]) =>
          <div>
            <label>
              <li>
                <input name={key} onChange={this.updatePAMCheckbox} type="checkbox" checked={value}/>
                PAM: {key}
              </li>
            </label>
            <br/>
          </div>
        )
        return (
          <div>
              <button type="button" onClick={this.handleSubmit}>
                  Advanced Search
              </button>
              { !this.state.show ? null : 
              <div id="advsearch">
                <h2><b>Filter the Search</b></h2>
                <b>PAM (check all the PAMs you want displayed):</b>
                <ul>
                  {PAMFilter}
                </ul>
                NMD Prediction (%):
                <ul>
                    <li><input type="checkbox" onChange={this.updateNMDPrediction}/>Only greater than 50%</li>
                </ul>
                RFLP Assay:
                <ul>
                    <li><input type="checkbox" onChange={this.updateRflpAssay}/>True</li>
                </ul>
                Upstream G:
                <ul>
                    <li><input type="checkbox" onChange={this.updateUpstreamG}/>No Upstream G</li>
                </ul>
                Off-target Prediction:
                <ul>
                    <li><input type="checkbox" onChange={this.updateOffTargetPrediction}/>No off-targets</li>
                </ul>
              </div>
              }
             
           </div>
        );
      }
    };