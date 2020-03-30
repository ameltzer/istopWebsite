import * as React from "react";   
import { FilterSearch, FilterSearchState } from "../FilterSearch"
import { API, graphqlOperation } from "aws-amplify";
import {gene, geneYeast, byAlias,  geneFish, geneMouse, geneFly, geneNematode, genePlant, geneRat } from "../../graphql/queries"
import {filterColumns, filterValues} from '../../actions'

export interface SearchProps {
  label: string;
  types: string[];
  parameterBuilder: any;
  customDataPrune: any;
  receiveState: any;
  isCancerSearch:boolean;
}

export interface SearchState {
  type: string;
  genes: string;
  filterState: FilterSearchState;
  disabled:boolean
}

const tableToColumns:Map<string, string[]> = new Map<string, string[]>(
  [
    ["Homo Sapiens",['gene','chr','strand','genome_cord','codon','n_tx_in_gene','percent_tx','rel_pos_largest_isoform','no_upstream_G','rFLP_Loss','rFLP_Gain','percent_NMD','sgNGG','sgNGG_matches','sgNGG_spacing','sgNGA','sgNGA_matches','sgNGA_spacing','sgNGCG','sgNGCG_matches','sgNGCG_spacing','sgNGAG','sgNGAG_matches','sgNGAG_spacing','sgNNGRRT','sgNNGRRT_matches','sgNNGRRT_spacing','sgNNNRRT','sgNNNRRT_matches','sgNNNRRT_spacing','cancer_type']],
    ["Alias",['gene','cancertype','mutation_aa','chr','strand','coord','PAM','iSTOP']],
    ["Yeast",['gene','chr','strand','genome_cord','codon','n_tx_in_gene','percent_tx','rel_pos_largest_isoform','no_upstream_G','rFLP_Loss','rFLP_Gain','percent_NMD','sgNGG','sgNGG_matches','sgNGG_spacing','sgNGA','sgNGA_matches','sgNGA_spacing','sgNGCG','sgNGCG_matches','sgNGCG_spacing','sgNGAG','sgNGAG_matches','sgNGAG_spacing','sgNNGRRT','sgNNGRRT_matches','sgNNGRRT_spacing','sgNNNRRT','sgNNNRRT_matches','sgNNNRRT_spacing']],
    ["Fish",['gene','chr','strand','genome_cord','codon','n_tx_in_gene','percent_tx','rel_pos_largest_isoform','no_upstream_G','rFLP_Loss','rFLP_Gain','percent_NMD','sgNGG','sgNGG_matches','sgNGG_spacing','sgNGA','sgNGA_matches','sgNGA_spacing','sgNGCG','sgNGCG_matches','sgNGCG_spacing','sgNGAG','sgNGAG_matches','sgNGAG_spacing','sgNNGRRT','sgNNGRRT_matches','sgNNGRRT_spacing','sgNNNRRT','sgNNNRRT_matches','sgNNNRRT_spacing']],
    ["Mouse",['gene','chr','strand','genome_cord','codon','n_tx_in_gene','percent_tx','rel_pos_largest_isoform','no_upstream_G','rFLP_Loss','rFLP_Gain','percent_NMD','sgNGG','sgNGG_matches','sgNGG_spacing','sgNGA','sgNGA_matches','sgNGA_spacing','sgNGCG','sgNGCG_matches','sgNGCG_spacing','sgNGAG','sgNGAG_matches','sgNGAG_spacing','sgNNGRRT','sgNNGRRT_matches','sgNNGRRT_spacing','sgNNNRRT','sgNNNRRT_matches','sgNNNRRT_spacing']],
    ["Fly",['gene','chr','strand','genome_cord','codon','n_tx_in_gene','percent_tx','rel_pos_largest_isoform','no_upstream_G','rFLP_Loss','rFLP_Gain','percent_NMD','sgNGG','sgNGG_matches','sgNGG_spacing','sgNGA','sgNGA_matches','sgNGA_spacing','sgNGCG','sgNGCG_matches','sgNGCG_spacing','sgNGAG','sgNGAG_matches','sgNGAG_spacing','sgNNGRRT','sgNNGRRT_matches','sgNNGRRT_spacing','sgNNNRRT','sgNNNRRT_matches','sgNNNRRT_spacing']],
    ["Nematode",['gene','chr','strand','genome_cord','codon','n_tx_in_gene','percent_tx','rel_pos_largest_isoform','no_upstream_G','rFLP_Loss','rFLP_Gain','percent_NMD','sgNGG','sgNGG_matches','sgNGG_spacing','sgNGA','sgNGA_matches','sgNGA_spacing','sgNGCG','sgNGCG_matches','sgNGCG_spacing','sgNGAG','sgNGAG_matches','sgNGAG_spacing','sgNNGRRT','sgNNGRRT_matches','sgNNGRRT_spacing','sgNNNRRT','sgNNNRRT_matches','sgNNNRRT_spacing']],
    ["Plant",['gene','chr','strand','genome_cord','codon','n_tx_in_gene','percent_tx','rel_pos_largest_isoform','no_upstream_G','rFLP_Loss','rFLP_Gain','percent_NMD','sgNGG','sgNGG_matches','sgNGG_spacing','sgNGA','sgNGA_matches','sgNGA_spacing','sgNGCG','sgNGCG_matches','sgNGCG_spacing','sgNGAG','sgNGAG_matches','sgNGAG_spacing','sgNNGRRT','sgNNGRRT_matches','sgNNGRRT_spacing','sgNNNRRT','sgNNNRRT_matches','sgNNNRRT_spacing']],
    ["Rat",['gene','chr','strand','genome_cord','codon','n_tx_in_gene','percent_tx','rel_pos_largest_isoform','no_upstream_G','rFLP_Loss','rFLP_Gain','percent_NMD','sgNGG','sgNGG_matches','sgNGG_spacing','sgNGA','sgNGA_matches','sgNGA_spacing','sgNGCG','sgNGCG_matches','sgNGCG_spacing','sgNGAG','sgNGAG_matches','sgNGAG_spacing','sgNNGRRT','sgNNGRRT_matches','sgNNGRRT_spacing','sgNNNRRT','sgNNNRRT_matches','sgNNNRRT_spacing']],
    ["Cosmic",['gene','cancerType','mutation_aa','chr','strand','coord','PAM','iSTOP']]
  ]
)


const tableToQuery:Map<string, string> = new Map<string, string> (
  [
    ["Homo Sapiens", gene],
    ["Yeast", geneYeast],
    ["Fish",geneFish],
    ["Mouse",geneMouse],
    ["Fly",geneFly],
    ["Nematode",geneNematode],
    ["Plant",genePlant],
    ["Rat",geneRat]
  ]
)

export class GeneSearch extends React.Component<SearchProps, SearchState> {
    constructor(props) {
      super(props);
      this.state = {type: this.props.types[0], genes: "", filterState: null, disabled:false}
    }



    handleSubmit = (e:  React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const genes = this.state.genes.split("\n")
      const queriesParameters = genes.map(gene => this.props.parameterBuilder(gene, this.state.type))
      const initialGeneSearchPromises = queriesParameters.map(queryParameters => API.graphql(graphqlOperation(queryParameters[0], queryParameters[1])))
      const columns:string[] = this.state && this.state.type && tableToColumns && tableToColumns.has(this.state.type) ? tableToColumns.get(this.state.type) : tableToColumns.get("Homo Sapiens")

      Promise.all(initialGeneSearchPromises).then(initialGeneSearchResults => {
        var successValues = []
        var failureInputGeneNames = []
        for(var i =0; i<initialGeneSearchResults.length; i++) {
          if (initialGeneSearchResults[i].data.gene.items && initialGeneSearchResults[i].data.gene.items.length > 0) {
            successValues.push(initialGeneSearchResults[i].data.gene.items)
          } else {
            failureInputGeneNames.push(queriesParameters[i][1].gene)
          }
        }
       
        console.log("check")
        console.log(failureInputGeneNames)
        console.log(successValues)

        const failureInputGeneNamePromises = failureInputGeneNames.map(failureInputGeneName => {
          API.graphql(graphqlOperation(byAlias, {limit:100000, alias:failureInputGeneName}))
        })

        Promise.all(failureInputGeneNamePromises).then((aliasResults:any) => {
          console.log("in alias results")
          console.log(aliasResults)
            const genePromises = aliasResults.map(aliasResult => aliasResult.data.gene.items.map(singleAlias => {
              console.log("singleAlias")
              console.log(singleAlias)
              return API.graphql(graphqlOperation(queryParameters[0], {
                limit: 1000000,
                gene: singleAlias.gene
              }))
            }))
            Promise.all(genePromises).then(geneResults => {
                console.log("finalStep")
                console.log(geneResults)
            })
        })

      })
      
      const queryParameters = this.props.parameterBuilder(genes[0], this.state.type)
      API.graphql(graphqlOperation(queryParameters[0], queryParameters[1]))
        .then(result => {
          var columns:string[] = this.state && this.state.type && tableToColumns && tableToColumns.has(this.state.type) ? tableToColumns.get(this.state.type) : tableToColumns.get("Homo Sapiens")
          /*if(result.data.gene.items || result.data.gene.items.length ==0) {
            console.log("alias route")
            API.graphql(graphqlOperation(byAlias, { limit: 1000000,alias: queryParameters[1].gene}))
            .then(aliasResult => {
                const genePromises = aliasResult.data.byAlias.items.map(alias => {
                  return API.graphql(graphqlOperation(queryParameters[0], {
                      limit: 1000000,
                      gene: alias.gene
                    }))
                })
                Promise.all(genePromises).then(geneResults => {
                  const genesFromAliasQuery = geneResults.map((geneResult:any) => geneResult.data.gene.items)
                  const filteredColumns = filterColumns(columns, this.state.filterState)
                  this.filterAllValues(genesFromAliasQuery, filteredColumns)
                }).catch(err => {
                  console.log(err)
                })
            }).catch(err => {
              console.log(err)
            })
          } else {
            console.log("gene route")
            if (this.props.isCancerSearch) {
              columns = tableToColumns.get('Homo Sapiens')
            }
            this.filterAllValues([result.data.gene.items], filterColumns(columns, this.state.filterState))
          }*/
        }).catch(err => {
          console.log(err)
      })
    }

    filterAllValues = (queryResults, filteredColumns) => {
      const filteredResults = queryResults.flatMap(queryResult => filterValues(queryResult, filteredColumns, this.state.filterState))
      this.props.receiveState(filteredResults, filteredColumns, this.state.type)
    }

    dropDownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      var newType = e.target.value;  
      this.setState(prevState => {
          return {
            ...prevState,
            type: newType,
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
      var selectForm = <select onChange={this.dropDownChange}> {this.props.types.map((typeName) => <option key={typeName}>{typeName}</option>)} </select>
      
      const toShow = <div>
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
              <input type="submit" value="Submit" disabled={this.state.disabled}/>
            </form>
          </div>
        </div>
      return (toShow);
    }
  };
