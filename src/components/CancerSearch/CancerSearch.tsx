import * as React from "react";
import { SearchProps, GeneSearch } from "../GeneSearch/GeneSearch"
import { FilterSearch, FilterSearchState } from "../FilterSearch"

interface CancerSearchArgs {
    cancerTypes: Map<string, boolean>;
    filterState: FilterSearchState;
}

export class CancerSearch extends React.Component<SearchProps, CancerSearchArgs> {

    constructor(props) {
        super(props)
        this.state = {
            filterState: null,
            cancerTypes: new Map(
                [
                    ["Bladder", false],
                    ["Blood", false],
                    ["Bone", false],
                    ["Breast", false],
                    ["Cervical", false],
                    ["Endometrial", false],
                    ["Colorectal", false],
                    ["Glioma", false],
                    ["Kidney", false],
                    ["Liver", false],
                    ["Lung", false],
                    ["Malignant melanoma", false],
                    ["Non-melanoma skin", false],
                    ["Ovarian", false],
                    ["Pancreatic", false],
                    ["Prostate", false],
                    ["Stomach", false],
                    ["Thyroid", false],
                    ["Upper aerodigestive", false],
                    ["Other", false],
                ]
            )}
    }

    handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {

    }

    handleInputChange = (e:  React.ChangeEvent<HTMLInputElement>) => { 
        var newCancerTypes:Map<string, boolean> = this.state.cancerTypes;
        newCancerTypes.set(e.target.name, e.target.checked)
        this.setState(prevState => {
            return {
                ...prevState,
                cancerTypes: newCancerTypes
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
        console.log(this.state)
        var cancerOptions =  <form onSubmit={this.handleSubmit}>
            { 
              Array.from(this.state.cancerTypes).map( 
                ([key, value]) => 
                    <div>
                        <label>
                            <input type="checkbox" checked={value} onChange={this.handleInputChange} name={key}/>
                            {key}
                        </label>
                        <br/>
                    </div>
              ) 
            }
            <input type="submit" value="Submit"/>
        </form>;
        return (
            <div className="rowflow">
                <div>
                <p>Search for sgSTOPs to model cancer-associated nonsense mutations in gene(s) of interest</p>
                <GeneSearch label={this.props.label} types={this.props.types}/>
                </div>
                <div className="ib2">
                <p>Search for sgSTOPs to model nonsense mutations in cancer type(s) of interest</p>
                <p>Do not select all of the cancer types</p>
                {cancerOptions}
                <FilterSearch setFilterState={this.filterCallback}/>
                </div>
            </div>
        )
    }

}