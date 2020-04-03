import * as React from "react";
import LollipopPlot from './LollipopGraph'
import Button from 'react-bootstrap/Button'
import { API, graphqlOperation } from "aws-amplify";
import TableViewer from 'react-js-table-with-csv-dl';

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
}

const geneList:string[] = ["BRCA1","BRCA2","BARD1","PALB2","BRIP1","RAD51C","RAD51D","XRCC3","NBN","MRE11A","RAD50","CHEK2","ATM","FANCA","FANCG","FANCC","FANCD2","FANCE","FANCF","FANCM","FANCI","FANCL","RECQL","ATR","BLM","WRN","CDK12","FAM175A","APTX","C17orf53","CDK5RAP2","CEP152","CEP63","ERCC8","ERCC6","DCLRE1C","DNA2","DONSON","ERCC1","ERCC4","LIG4","LMNA","MCM8","MCM9","MCPH1","MLH1","MSH2","MSH6","MUTYH","NIN","ORC1","ORC4","PCNT","PMS2","PNKP","POLE","POLH","PRKDC","RAD51","RBBP8","RECQL4","REV3L","RFWD3","RIF1","RNASEH2A","RNF168","RTEL1","SAMHD1","SETX","SLX4","SMARCAL1","TDP1","TP53BP1","TRAIP","TREX1","GTF2H5","UBE2T","UVSSA","NHEJ1","XPA","ERCC3","ERCC2","ERCC5","ZRANB3","TONSL","HLTF"]

const domains = [
    {
      'startCodon': 57,
      'endCodon': 167,
      'label': 'Recep_L_domain',
      'color': '#2dcf00',
      'tooltip': {
        'header': 'Recep_L_domain',
        'body': 'Recep_L_domain (57 - 167)'
      }
    },
    {
      'startCodon': 185,
      'endCodon': 338,
      'label': 'Furin-like',
      'color': '#ff5353',
      'tooltip': {
        'header': 'Furin-like'
      }
    },
    {
      'startCodon': 361,
      'endCodon': 480,
      'label': 'Recep_L_domain',
      'color': '#2dcf00'
    },
    {
      'startCodon': 505,
      'endCodon': 636,
      'label': 'GF_recep_IV',
      'color': '#5b5bff',
      'tooltip': {
        'header': 'Title',
        'body': 'Description'
      }
    },
    {
      'startCodon': 713,
      'endCodon': 965,
      'label': 'Pkinase_Tyr',
      'color': '#ebd61d',
      'tooltip': {
        'header': 'Title',
        'body': 'Description'
      }
    }
  ]

  export const lollipops = [
    {
      'codon': 858,
      'count': 10,
      'tooltip': {
        'header': 'Title',
        'body': 'Description'
      },
      'color': '#008000',
      'id': 'variant-id-001',
      'label': {
        'text': 'L858R',
        'textAnchor': 'middle',
        'fontSize': 10,
        'fontFamily': 'arial'
      },
      'selected': true
    },
    {
      'codon': 746,
      'count': 17,
      'tooltip': {
        'header': 'Title',
        'body': 'Description'
      },
      'color': '#993404',
      'selected': true
    },
    {
      'codon': 861,
      'count': 5,
      'tooltip': {
        'header': 'Title',
        'body': 'Description'
      },
      'color': '#008000'
    },
    {
      'codon': 747,
      'count': 5,
      'tooltip': {
        'header': 'Title',
        'body': 'Description'
      },
      'color': '#993404',
      'selected': false
    },
    {
      'codon': 768,
      'count': 3,
      'tooltip': {
        'header': 'Title',
        'body': 'Description'
      },
      'color': '#008000'
    },
    {
      'codon': 754,
      'count': 3,
      'tooltip': {
        'header': 'Title',
        'body': 'Description'
      },
      'color': '#008000'
    },
    {
      'codon': 719,
      'count': 3,
      'tooltip': {
        'header': 'Title',
        'body': 'Description'
      },
      'color': '#008000'
    },
    {
      'codon': 709,
      'count': 3,
      'tooltip': {
        'header': 'Title',
        'body': 'Description'
      },
      'color': '#993404'
    },
    {
      'codon': 833,
      'count': 2,
      'tooltip': {
        'header': 'Title',
        'body': 'Description'
      },
      'color': '#008000'
    },
    {
      'codon': 1,
      'count': 1,
      'tooltip': {
        'header': 'Title',
        'body': 'Description'
      },
      'color': '#cf58bc'
    }
  ]


const options = {
  displayDomainLabel: false,
  displayLegend: true
}

const onLollipopClickHandler = (data) => {
  console.log('onLollipopClick', data)
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

const tableHeaders = ['gene','sgRNASequence','aapos','function','clinVar','lfcUNT','pvalueUNT','fdrUNT','lfcCISP','pvalueCISP','fdrCISP','lfcCPT','pvalueCPT','fdrCPT','lfcDOX','pvalueDOX','fdrDOX','lfcOLAP','pvalueOLAP','fdrOLAP']
const tableHeaderTranslation = new Map(
  [
    ['gene', 'Gene'],
    ['sgRNASequence','SG RNA Sequence'],
    ['aapos', 'AA Pos'],
    ['function', 'Function'],
    ['clinVar', 'Clinical Relevence'],
    ['lfcUNT', 'LFC Untreated'],
    ['pvalueUNT', 'PValue Untreated'],
    ['fdrUNT', 'FDR Untreated'],
    ['lfcCISP', 'LDFC Cisplatin'],
    ['pvalueCISP', 'PValue Cisplatin'],
    ['fdrCISP', 'FDR Cisplatin'],
    ['lfcCPT', 'LFC Camptothecin'],
    ['pvalueCPT', 'PValue Camptothecin'],
    ['fdrCPT', 'FDR Camptothecin'],
    ['lfcDOX', 'LFC Doxorubicin'],
    ['pvalueDOX', 'PValue Doxorubicin'],
    ['fdrDOX', 'FDR Doxorubicin'],
    ['lfcOLAP', 'LFC Olaparib'],
    ['pvalueOLAP', 'PValue Olaparib'],
    ['fdrOLAP', 'FDR Olaparib']
  ]
)

export class CandlestickResults extends React.Component<CandlestickProps, CandlestickState> {

    constructor(props) {
        super(props)
        this.state = {
            gene: "",
            treatment: "UNT",
            isInSearch:true,
            curGeneList: geneList,
            mockData: {
                vizHeight: 130, // hardcoded
                vizWidth: 665, // hardcoded
                xMax: 1210, // protein length
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
      } else if(fun === "silent") {
        return "#0000FF"
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
          console.log(result)
          this.setState(prevState => {
            return {
              ...prevState,
              numberOfAAS: result.data.getGeneLollipopGraph.numberOfAAS,
              transcriptId: result.data.getGeneLollipopGraph.transcriptId
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
                gene: "BRCA1",
                isInSearch: false,
                mockData: {
                    vizHeight: 130, // hardcoded
                    vizWidth: 665, // hardcoded
                    xMax: 1210, // protein length
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
        this.setState(prevState => {
          return {
            ...prevState,
            treatment: treatment
          }
        })
        this.updateState(this.state.mockData.lollipops)
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

    render() {
        console.log(this.state.mockData.lollipops)
        const lollipops = this.state.mockData.lollipops.map(lollipop => this.lollipopUIState(lollipop))
        this.state.curGeneList.sort();
        const toDisplay = this.state.isInSearch ? 
            <div></div> :
            <div>
                
                <p className="helvetica">{this.state.gene} {this.state.treatment}</p>
                <br/>
                <h3>{this.translateTreatmentName()}</h3>
                <br/>
                <div className="plotLeft">
                  <LollipopPlot
                      domains={this.state.mockData.domains}
                      lollipops={lollipops}
                      vizWidth={665}
                      vizHeight={500}
                      hugoGeneSymbol={this.state.mockData.hugoGeneSymbol}
                      xMax={this.state.mockData.xMax}
                      onLollipopClick={onLollipopClickHandler}
                      options={options}
                      proteinLength={this.state.numberOfAAS}
                  />
                </div>
                <div className="radioRight">
                <label><input type="radio" className="rightSideButton" onClick={this.setTreatment("UNT")}/>Untreated</label>
                <br/>
                <label><input type="radio" className="rightSideButton" onClick={this.setTreatment("CISP")}/>Cisplatin</label>
                <br/>
                <label><input type="radio" className="rightSideButton" onClick={this.setTreatment("OLAP")}/>Olaparib</label>
                <br/>
                <label><input type="radio" className="rightSideButton" onClick={this.setTreatment("DOX")}/>Doxorubicin</label>
                <br/>
                <label><input type="radio" className="rightSideButton" onClick={this.setTreatment("CPT")}/>Camptothecin</label>
                </div>
                <br/>
                <TableViewer
                  title="Table"
                  content={this.state.mockData.lollipops.map(lollipop => {
                    var newObj = {}
                    tableHeaders.forEach(el => newObj[el] = lollipop[el])
                    return newObj
                  })}
                  headers = {tableHeaders}
                  minHeight={0}
                  maxHeigh={400}
                  activateDownloadButton={true}
                />
                <br/>
                <Button onClick={this.goBack}>Go Back</Button>
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
