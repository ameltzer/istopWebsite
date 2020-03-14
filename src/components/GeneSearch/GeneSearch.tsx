import * as React from "react";   
import { FilterSearch, FilterSearchState } from "../FilterSearch"
import { API } from "aws-amplify";

export interface SearchProps {
  label: string;
  types: string[];
}

export interface SearchState {
  types: string;
  genes: string;
  filterState: FilterSearchState;
}


export class GeneSearch extends React.Component<SearchProps, SearchState> {
    constructor(props) {
      super(props);
      this.state = {types: "Homo sapiens", genes: "", filterState: null}
    }

    handleSubmit = (e:  React.FormEvent<HTMLFormElement>) => {
      console.log("before call")
      var promise:Promise<any> = API.get("genomic", "/items/mygene", {})
      promise.then(response => {
        console.log("in success")
        console.log(response)
      }).catch(error => {
        console.log("in error")
        console.log(error)
      })
    }

    checkboxChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      var newType = e.target.value;  
      this.setState(prevState => {
          return {
            ...prevState,
            types: newType,
          }
      })
    }
    
    textAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      var newGenes = e.target.value ? e.target.value : ""
      this.setState(prevState => {
        return {
          ...prevState,
          genes: newGenes
        }
      })
    }

    filterCallback = (newFilterState:FilterSearchState) => {
      this.setState(prevState => {
        return {
          ...prevState,
          filterState: newFilterState
        }
      })
    }

    render() {
      var selectForm = <select onChange={this.checkboxChange}> {this.props.types.map((typeName) => <option key={typeName}>{typeName}</option>)} </select>
      return (
        <div>
          <div id="search">
            <form onSubmit={this.handleSubmit}>
              <label>
                {this.props.label}
                {selectForm}
                <br/>
                Gene:
                <textarea onChange={this.textAreaChange} value={this.state.genes}/>
              </label>
              <FilterSearch setFilterState={this.filterCallback}/>
              <input type="submit" value="Submit"/>
            </form>
          </div>
        </div>
      );
    }
  };
