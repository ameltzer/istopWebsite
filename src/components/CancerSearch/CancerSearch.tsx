import * as React from "react";
import { GeneSearch } from "../GeneSearch/GeneSearch"
import { FilterSearch, FilterSearchState } from "../FilterSearch"
import {SearchState} from '../../components/GeneSearch'
import {gene,listHomoSapienss} from "../../graphql/queries"
import {QueryResults} from '../../components/QueryResults'
import Button from 'react-bootstrap/Button'
import { API, graphqlOperation } from "aws-amplify";
import {filterColumns, filterValues} from '../../actions'

interface CancerProps {

}

interface CancerSearchArgs {
    cancerTypes: Map<string, boolean>;
    queryValues: Object[]
    queryColumns: string[]
    mode: number;
    filterState:FilterSearchState
}
var cancerTypes = ["Any", "Bladder", "Blood", "Bone", "Breast", "Cervical", "Colorectal", "Endometrial", "Glioma",
        "Kidney", "LIver", "Lung", "Malignant melanoma", "Non-melanoma skin", "Ovarian", "Pancreatic", "Prostate",
        "Stomach", "Thyroid", "Upper aerodigestive", "Other"];

const columns: string[] = ['gene','chr','strand','genome_cord','codon','n_tx_in_gene','percent_tx','rel_pos_largest_isoform','no_upstream_G','rFLP_Loss','rFLP_Gain','percent_NMD','sgNGG','sgNGG_matches','sgNGG_spacing','sgNGA','sgNGA_matches','sgNGA_spacing','sgNGCG','sgNGCG_matches','sgNGCG_spacing','sgNGAG','sgNGAG_matches','sgNGAG_spacing','sgNNGRRT','sgNNGRRT_matches','sgNNGRRT_spacing','sgNNNRRT','sgNNNRRT_matches','sgNNNRRT_spacing','cancer_type']
export class CancerSearch extends React.Component<CancerProps, CancerSearchArgs> {

    constructor(props) {
        super(props)
        this.state = {
            queryValues: [],
            queryColumns: [],
            mode: 0,
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

    cancerCallBack(geneName:string, type:string) {
        const geneQuery = { 
            limit: 1000000,
            gene: geneName
          }
          
        return [gene, geneQuery]
    }

    receiveState(queryValues:Object[], queryColumns:string[], type:string) {
        console.log("type")
        console.log(type)
        const filteredQueryValues:Object[] = queryValues.filter(queryValue =>{
            return queryValue["cancer_type"] && queryValue["cancer_type"].includes(type)
        }
        )
        this.setState((prevState) => { 
            return {
                ...prevState,
                queryValues: filteredQueryValues,
                queryColumns: queryColumns,
                mode: 2
            }
        })
    }


    searchByCancerType(e) {
        e.preventDefault()
       const filters:string[] = Array.from(this.state.cancerTypes).filter((kv:[string, boolean]) => kv[1]).map((kv:[string,boolean]) => kv[0])
       this.constructFilter(filters, [])
    }

    constructFilter(filters:string[], curValues:object[]) {
        console.log(filters)
        if (!filters || filters.length == 0) {
            const filteredResults = filterValues(curValues, filterColumns(columns, this.state.filterState), this.state.filterState);
            const filteredColumns = filterColumns(columns, this.state.filterState);
            console.log(filteredResults)
            console.log(filteredColumns)
            this.setState(prevState => {
                return {
                    ...prevState,
                    queryValues: filteredResults,
                    queryColumns: filteredColumns,
                    mode: 2
                }
            })
            return null;
        }
        const filter = {
            cancer_type: {
                eq: filters[0]
            }
        }

        console.log(filter)
        API.graphql(graphqlOperation(listHomoSapienss, { 
            limit: 1000000,
            filter: filter
        })).then(result => {
            console.log(result)
            this.constructFilter(filters.slice(1), curValues.concat(result.data.listHomoSapienss.items))
        }).catch(err => {
        })
    }
    
    goBack = (e) => {
        this.setState(prevState => {
          return {
            mode: 0,
            queryValues: [],
            queryColumns: [],
          }
        })
      }
    render() {
        var toDisplay = null;

        if (this.state.mode === 0) {
            toDisplay =  <div className="rowflow">
                            <div>
                            <p>Search for sgSTOPs to model cancer-associated nonsense mutations in gene(s) of interest</p>
                            <GeneSearch isCancerSearch={true} receiveState={this.receiveState.bind(this)} label="Cancer Types" types={cancerTypes} parameterBuilder={this.cancerCallBack} customDataPrune={result => result}/>
                            </div>
                            <div className="ib2">
                            <p>Search for sgSTOPs to model nonsense mutations in cancer type(s) of interest</p>
                            <p>Do not select all of the cancer types</p>
                            <form onSubmit={this.searchByCancerType.bind(this)}>
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
                            </form>
                            <FilterSearch setFilterState={this.filterCallback}/>
                            </div>
                        </div>
        } else if(this.state.mode == 1 || this.state.mode == 2) {
            toDisplay = <div>
                        <QueryResults 
                            data={this.state.queryValues} 
                            columnDefinition={this.state.queryColumns}/>
                        <br/>
                        <Button onClick={this.goBack}>Go Back</Button>
                    </div>
        }

        return (<div>
            {toDisplay}
        </div>)
    }

}