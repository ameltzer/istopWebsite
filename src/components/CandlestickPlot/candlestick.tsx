import * as React from "react";
import LollipopPlot from './LollipopGraph'
import Button from 'react-bootstrap/Button'
import { API, graphqlOperation } from "aws-amplify";
import BootstrapTable from 'react-bootstrap-table-next'
import ToolkitProvider, { CSVExport } from 'react-bootstrap-table2-toolkit';
const { ExportCSVButton } = CSVExport;

interface CandlestickProps {

}

interface CandlestickState {
    gene:string
    treatment:string
    isInSearch:boolean
    curGeneList:string[]
    mockData:any
    numberOfAAS:number
    transcriptId:string
    radioChecked:Map<string, boolean>
    curPressed:string
    funCheckBoxChecked:Map<string, boolean>
    pValueGreaterThan:Map<string, boolean>
    displayGene:string
    xMax:number
}

const geneList:string[] = ["BRCA1","BRCA2","BARD1","PALB2","BRIP1","RAD51C","RAD51D","XRCC3","NBN","MRE11A","RAD50","CHEK2","ATM","FANCA","FANCG","FANCC","FANCD2","FANCE","FANCF","FANCM","FANCI","FANCL","RECQL","ATR","BLM","WRN","CDK12","FAM175A","APTX","C17orf53","CDK5RAP2","CEP152","CEP63","ERCC8","ERCC6","DCLRE1C","DNA2","DONSON","ERCC1","ERCC4","LIG4","LMNA","MCM8","MCM9","MCPH1","MLH1","MSH2","MSH6","MUTYH","NIN","ORC1","ORC4","PCNT","PMS2","PNKP","POLE","POLH","PRKDC","RAD51","RBBP8","RECQL4","REV3L","RFWD3","RIF1","RNASEH2A","RNF168","RTEL1","SAMHD1","SETX","SLX4","SMARCAL1","TDP1","TP53BP1","TRAIP","TREX1","GTF2H5","UBE2T","UVSSA","NHEJ1","XPA","ERCC3","ERCC2","ERCC5","ZRANB3","TONSL","HLTF"]

const options = {
  displayDomainLabel: false,
  displayLegend: true
}

const getGeneLollipopGraph2 = /* GraphQL */ `
  query GetGeneLollipopGraph($id: ID!) {
    getGeneLollipopGraph(id: $id) {
      id
      transcriptId
      transcriptId2
      numberOfAAS
      lollipopLocations(limit:1000000) {
        items {
          id
          gene
          sgRNASequence
          function
          aapos
          lfcUNT
          pvalueUNT
          fdrUNT
          lfcCISP
          pvalueCISP
          fdrCISP
          lfcOLAP
          pvalueOLAP
          fdrOLAP
          lfcDOX
          pvalueDOX
          fdrDOX
          lfcCPT
          pvalueCPT
          fdrCPT
          clinVar
          aachg
        }
        nextToken
      }
    }
  }
`;

const tableHeaders = ['gene','sgRNASequence','aapos','function','clinVar','lfcUNT','pvalueUNT','fdrUNT','lfcCISP','pvalueCISP','fdrCISP','lfcCPT','pvalueCPT','fdrCPT','lfcDOX','pvalueDOX','fdrDOX','lfcOLAP','pvalueOLAP','fdrOLAP','aachg']
const tableHeaderTranslation = new Map(
  [
    ['gene', 'Gene'],
    ['sgRNASequence','sgRNA Sequence'],
    ['aapos', 'AA Pos'],
    ['function', 'Function'],
    ['clinVar', 'Clinical Relevance'],
    ['lfcUNT', 'LFC Untreated'],
    ['pvalueUNT', 'P-Value Untreated'],
    ['fdrUNT', 'FDR Untreated'],
    ['lfcCISP', 'LDFC Cisplatin'],
    ['pvalueCISP', 'P-Value Cisplatin'],
    ['fdrCISP', 'FDR Cisplatin'],
    ['lfcCPT', 'LFC Camptothecin'],
    ['pvalueCPT', 'P-Value Camptothecin'],
    ['fdrCPT', 'FDR Camptothecin'],
    ['lfcDOX', 'LFC Doxorubicin'],
    ['pvalueDOX', 'P-Value Doxorubicin'],
    ['fdrDOX', 'FDR Doxorubicin'],
    ['lfcOLAP', 'LFC Olaparib'],
    ['pvalueOLAP', 'P-Value Olaparib'],
    ['fdrOLAP', 'FDR Olaparib'],
    ['aachg', 'AA Change']
  ]
)

export class CandlestickResults extends React.Component<CandlestickProps, CandlestickState> {

    constructor(props) {
        super(props)
        this.state = {
            displayGene:"",
            funCheckBoxChecked: new Map<string, boolean>([["nonsense",false], ["missense",false],["splice",false],["synonymous",false],["other",false]]),
            pValueGreaterThan: new Map<string, boolean>([["UNT",false],["CISP",false],["OLAP",false],["DOX",false],["CPT",false]]),
            radioChecked: new Map<string, boolean>([["UNT",true],["CISP",false],["OLAP",false],["DOX",false],["CPT",false]]),
            curPressed: "UNT",
            gene: "",
            treatment: "UNT",
            isInSearch:true,
            curGeneList: geneList,
            xMax: 1210,
            mockData: {
                vizHeight: 130, // hardcoded
                vizWidth: 665, // hardcoded
                yMax: 23, // max #mutations
                hugoGeneSymbol: 'Log Fold Change',
                lollipops: [],
                domains: []
              },
              numberOfAAS:0,
              transcriptId:""
        }
    }

    componentDidMount = () => {
      this.setState(prevState => {
        return {
          ...prevState,
          gene:geneList[0]
        }
      })
    }

    dropDownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newGene = e.target.value
        this.setState(prevState => {
            return {
              ...prevState,
              gene: newGene
            }
        })
      }
    
    colorCode = (fun: string) => {
      if(fun === "nonsense") {
        return "#FF0000"
      } else if(fun === "missense") {
        return "#800080"
      } else if(fun === "splice") {
        return "#FFA500"
      } else if(fun === "synonymous") {
        return "#008000	"
      } else {
        return "#000000"
      }
    }

    filterLocations = (locations) => {
      return  locations.filter(location => location.aapos.toUpperCase() != "NA")
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const query = {
          id: this.state.gene
        };
        API.graphql(graphqlOperation(getGeneLollipopGraph2, query)).then(result => {
          const filteredLocations = this.filterLocations(result.data.getGeneLollipopGraph.lollipopLocations.items)
          const xMax:number = parseInt(result.data.getGeneLollipopGraph.numberOfAAS)

          this.setState(prevState => {
            return {
              ...prevState,
              numberOfAAS: result.data.getGeneLollipopGraph.numberOfAAS,
              transcriptId: result.data.getGeneLollipopGraph.transcriptId,
              displayGene: this.state.gene,
              xMax: xMax,
            }
          })
          this.updateState(filteredLocations)
        }).catch(err => {
          console.log(err)
        })
    }

    lollipopUIState = (location) => {
      return {
        'codon': location.aapos,
        'count': location['lfc'+this.state.treatment],
        'tooltip': {
          'body': 'sgRNA_sequence:'+location.sgRNASequence+
          '<br/>lcf_'+this.state.treatment+':'+location['lfc'+this.state.treatment]+
          '<br/>pvalue_'+this.state.treatment+':'+location['pvalue'+this.state.treatment]+
          '<br/>fdr_'+this.state.treatment+':'+location['fdr'+this.state.treatment]+
          '<br/>aachg'+this.state.treatment+':'+location.aachg+
          '<br/>clinVar'+this.state.treatment+':'+location.clinVar
        },
        'color': this.colorCode(location.function),
        'id': location.id,
        'selected': true
      }
    }

    updateState = (filteredLocations) => {
          this.setState(prevState => {
            return {
                ...prevState,
                isInSearch: false,
                mockData: {
                    vizHeight: 130, // hardcoded
                    vizWidth: 665, // hardcoded
                    hugoGeneSymbol: 'Log Fold Change',
                    lollipops: filteredLocations,
                    domains: []
                  }
            }
    })
  }

    filterDropDown = (e) => {
        const substring:string = e.target.value
        const newGeneList = geneList.filter(gene => gene.startsWith(substring.toUpperCase()))
        const newGene = newGeneList.length > 0 ? newGeneList[0] : this.state.gene
        this.setState(prevState => {
            return {
                ...prevState,
                curGeneList: newGeneList,
                gene: newGene
            }
        })

    }

    goBack = () => {
        this.setState(prevState => {
            return {
                ...prevState,
                isInSearch: true
            }
        })
    }

    setTreatment = (treatment:string) => {
      return (e) => {
        const curCheckedMap = this.state.radioChecked;
        curCheckedMap.set(treatment, true)
        curCheckedMap.set(this.state.curPressed, false)
        this.setState(prevState => {
          return {
            ...prevState,
            treatment: treatment,
            radioChecked: curCheckedMap,
            curPressed: treatment
          }
        })
        this.updateState(this.state.mockData.lollipops)
      }
    }

    setFun = (fun:string) => {
      return (e) => {
        var newFunCheckBoxChecked =  this.state.funCheckBoxChecked;
        const curCheck:boolean = newFunCheckBoxChecked.get(fun)
        newFunCheckBoxChecked.set(fun, !curCheck)
        this.setState(prevState => {
          return {
            ...prevState,
            funCheckBoxChecked:newFunCheckBoxChecked
          }
        })
        
      }
    }

    setPValueGreaterThan = (treatment:string) => {
      return (e) => {
        const curPValue = this.state.pValueGreaterThan;
        curPValue.set(treatment, !curPValue.get(treatment))
        this.setState(prevState => {
          return {
            ...prevState,
            pValueGreaterThan: curPValue,
          }
        })
      }
    }

    translateTreatmentName() {
      if(this.state.treatment === "UNT") {
        return "Untreated";
      }
      if(this.state.treatment === "CISP") {
        return "Cisplatin";
      }
      if(this.state.treatment === "OLAP") {
        return "Olaparib";
      }
      if(this.state.treatment === "DOX") {
        return "Doxorubicin";
      }
      if(this.state.treatment === "CPT") {
        return "Camptothecin";
      }
    }

    orCombination = (value:string, checks:string[]) => {
      return checks.some(check => check === value)
    }

    render() {
        var filteredLollipops = this.state.mockData.lollipops
        const funFilters:string[] = Array.from(this.state.funCheckBoxChecked).filter(funFilter => funFilter[1]).map(funFilter => funFilter[0])
        if (funFilters.length > 0) {
          filteredLollipops = filteredLollipops.filter(lollipop =>  funFilters.some(check => check === lollipop.function))
        }

        const pValueFilters:string[] = Array.from(this.state.pValueGreaterThan).filter(pvalueFilter => pvalueFilter[1]).map(pvalueFilter => pvalueFilter[0])
        if (pValueFilters.length > 0) {
          for(var i=0; i<pValueFilters.length; i++) {
            filteredLollipops = filteredLollipops.filter(lollipop => lollipop['pvalue'+pValueFilters[i]] > 0.01)
          }
        }

        const lollipops = filteredLollipops.map(lollipop => this.lollipopUIState(lollipop))
        this.state.curGeneList.sort();


        var tableLollipops = filteredLollipops.map(lollipop => {
          return {
            ...lollipop,
            clinVar: lollipop.clinVar.replace("-1:","").replace("0:","").replace("1:","")
          }
        })
        tableLollipops = tableLollipops.map(filteredLollipop => {
          return {
            ...filteredLollipop,
            aapos: parseInt(filteredLollipop.aapos)
          }
        })
        const displayLollipops = tableLollipops.map(lollipop => {
          var newObj = {}
          tableHeaders.forEach(el => newObj[el] = lollipop[el])
          return newObj
        })

        const bootStrapHeaders = tableHeaders.map(header => {
          return {
            dataField: header,
            text: tableHeaderTranslation.get(header),
            sort: true,
            order: 'asc',
            classes:(cell, row, rowIndex, colIndex) => {
              return colIndex == 1 ? 'breakAll' : 'breakWords';
            },
            sortFunc: (a,b,order,dataField,rowA,rowB) => {
                if (order === 'asc') {
                  const result:number = a > b ? 1 : -1
                  return result
                }
                const result:number = a > b ? -1 : 1
                return result
             
            }
          }
        })

        const toDisplay = this.state.isInSearch ? 
            <div></div> :
            <div>
            <div>
                <br/>
                <p className="helvetica">{this.state.displayGene} {this.state.transcriptId}</p>
                <h3>{this.translateTreatmentName()}</h3>
                <br/>
                <div className="plotLeft">
                  <LollipopPlot
                      domains={this.state.mockData.domains}
                      lollipops={lollipops}
                      vizWidth={765}
                      vizHeight={500}
                      hugoGeneSymbol={this.state.mockData.hugoGeneSymbol}
                      xMax={this.state.xMax}
                      options={options}
                      proteinLength={this.state.numberOfAAS}
                  />
                </div>
                <div className="radioRight overlfowAuto">
                  <h3>Filters</h3>
                  <label><input type="radio" className="rightSideButton" onClick={this.setTreatment("UNT")} checked={this.state.radioChecked.get("UNT")}/>Untreated</label>
                  <br/>
                  <label><input type="radio" className="rightSideButton" onClick={this.setTreatment("CISP")} checked={this.state.radioChecked.get("CISP")}/>Cisplatin</label>
                  <br/>
                  <label><input type="radio" className="rightSideButton" onClick={this.setTreatment("OLAP")} checked={this.state.radioChecked.get("OLAP")}/>Olaparib</label>
                  <br/>
                  <label><input type="radio" className="rightSideButton" onClick={this.setTreatment("DOX")} checked={this.state.radioChecked.get("DOX")}/>Doxorubicin</label>
                  <br/>
                  <label><input type="radio" className="rightSideButton" onClick={this.setTreatment("CPT")} checked={this.state.radioChecked.get("CPT")}/>Camptothecin</label>
                  <br/>
                  <br/>
                  <label><input type="checkbox" className="rightSideButton" onClick={this.setPValueGreaterThan("UNT")} checked={this.state.pValueGreaterThan.get("UNT")}></input>P-value >0.01 Untreated</label>
                  <br/>
                  <label><input type="checkbox" className="rightSideButton" onClick={this.setPValueGreaterThan("CISP")} checked={this.state.pValueGreaterThan.get("CISP")}></input>P-value >0.01 Cisplatin</label>
                  <br/>
                  <label><input type="checkbox" className="rightSideButton" onClick={this.setPValueGreaterThan("OLAP")} checked={this.state.pValueGreaterThan.get("OLAP")}></input>P-value >0.01 Olaparib</label>
                  <br/>
                  <label><input type="checkbox" className="rightSideButton" onClick={this.setPValueGreaterThan("DOX")} checked={this.state.pValueGreaterThan.get("DOX")}></input>P-value >0.01 Doxorubicin</label>
                  <br/>
                  <label><input type="checkbox" className="rightSideButton" onClick={this.setPValueGreaterThan("CPT")} checked={this.state.pValueGreaterThan.get("CPT")}></input>P-value >0.01 Camptothecin</label>

                  <br/>
                  <br/>
                  <b>Legend</b>
                  <br/>
                  <label style = {{margin: "2px", color:"#FF0000"}}><input type="checkbox" className="rightSideButton" onClick={this.setFun("nonsense")} checked={this.state.funCheckBoxChecked.get("nonsense")}/>Nonsense</label>
                  <label style = {{margin: "2px", color:"#800080"}}><input type="checkbox" className="rightSideButton" onClick={this.setFun("missense")} checked={this.state.funCheckBoxChecked.get("missense")}/>Missense</label>
                  <br/>
                  <label style = {{margin: "2px", color:"#FFA500"}}><input type="checkbox" className="rightSideButton" onClick={this.setFun("splice")} checked={this.state.funCheckBoxChecked.get("splice")}/>Splice</label>
                  <label style = {{margin: "2px", color:"#008000"}}><input type="checkbox" className="rightSideButton" onClick={this.setFun("synonymous")} checked={this.state.funCheckBoxChecked.get("synonymous")}/>Silent</label>
                 <label style = {{margin: "2px", color:"#000000"}}><input type="checkbox" className="rightSideButton" onClick={this.setFun("other")} checked={this.state.funCheckBoxChecked.get("other")}/>Other</label>
                </div>
                <br/>
                <br/>
                <br/>
              </div>
              <div>
                <div> 
                <ToolkitProvider>
                  {
                    props => (
                      <div>
                        <ExportCSVButton { ...props.csvProps }>Export CSV</ExportCSVButton>
                        <hr />
                        <BootstrapTable  tdStyle={{whiteSpace:'normal'}}
                        wrapperClasses="table-responsive"
                          keyField='sgRNASequence' 
                          data={displayLollipops}
                          columns ={bootStrapHeaders}
                          bootstrap4={true}
                          striped
                          condensed={true}
                          defaultSorted = {
                            [
                              {
                                dataField:'aapos',
                                order: 'asc'
                              }
                            ]} />
                      </div>
                    )
                  }
                </ToolkitProvider>
                  <br/>
                  <Button onClick={this.goBack}>Go Back</Button>
                </div>
            </div>
            </div>

        return (
          <div>
            <div>
                <form onSubmit={this.handleSubmit}>
                    <h3>Gene Search</h3>
                    <br/>
                    Filter Box
                    <br/>
                    <input type="text" name="filter" onChange={this.filterDropDown}/>
                    <select onChange={this.dropDownChange}> {this.state.curGeneList.map((typeName) => <option key={typeName}>{typeName}</option>)} </select>
                    <br/>
                    <input type="submit" value="Submit"/>
                    <br/>
                    Note the current drop down value will be used for search.
                </form>
                 
            </div>
            {toDisplay}  
          </div>
        )
    }
}
