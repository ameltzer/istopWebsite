import * as React from "react";
import LollipopPlot from './LollipopGraph'
import Button from 'react-bootstrap/Button'
import { API, graphqlOperation } from "aws-amplify";
import BootstrapTable from 'react-bootstrap-table-next'
import ToolkitProvider, { CSVExport } from 'react-bootstrap-table2-toolkit';
const { ExportCSVButton } = CSVExport;
import { HashRouter as Router, Switch, Route} from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { getGeneLollipopGraphMcf7 } from "src/graphql/queries";


interface CandlestickProps {
    setMode: (e) => void
}

interface CandlestickState {
    gene:string
    treatment:string
    isInSearch:boolean
    curGeneList:string[]
    renderConfigData:any
    numberOfAAS:number
    transcriptId:string
    radioChecked:Map<string, boolean>
    radioCheckedCell:Map<string, boolean>
    curPressedCell:string
    funCheckBoxChecked:Map<string, boolean>
    pValueLessThan:Map<string, boolean>
    displayGene:string
    xMax:number
    lollipopsClicked:Map<string,boolean>
    domains:object[]
}




const geneList:string[] = ["BRCA1","BRCA2","BARD1","PALB2","BRIP1","RAD51C","RAD51D","XRCC3","NBN","MRE11A","RAD50","CHEK2","ATM","FANCA","FANCG","FANCC","FANCD2","FANCE","FANCF","FANCM","FANCI","FANCL","RECQL","ATR","BLM","WRN","CDK12","ABRAXAS1","APTX","HROB","CDK5RAP2","CEP152","CEP63","ERCC8","ERCC6","DCLRE1C","DNA2","DONSON","ERCC1","ERCC4","LIG4","LMNA","MCM8","MCM9","MCPH1","MLH1","MSH2","MSH6","MUTYH","NIN","ORC1","ORC4","PCNT","PMS2","PNKP","POLE","POLH","PRKDC","RAD51","RBBP8","RECQL4","REV3L","RFWD3","RIF1","RNASEH2A","RNF168","RTEL1","SAMHD1","SETX","SLX4","SMARCAL1","TDP1","TP53BP1","TRAIP","TREX1","GTF2H5","UBE2T","UVSSA","NHEJ1","XPA","ERCC3","ERCC2","ERCC5","ZRANB3","TONSL","HLTF"]

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
          aachg
          clinVar
          clinVar_ID
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
          tCGA
          pTMsiteLoc
          noncanonicalTranscript
          cellLine
        }
        nextToken
      }
      domains {
        items {
          id
          accessionNumber
          type
          start
          end
          gene
          identifier
          color
        }
        nextToken
      }
    }
  }
`;

const getGeneLollipopGraphMCF72 = /* GraphQL */ `
  query GetGeneLollipopGraphMCF7($id: ID!) {
    getGeneLollipopGraphMCF7(id: $id) {
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
          aachg
          clinVar
          clinVar_ID
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
          tCGA
          pTMsiteLoc
          noncanonicalTranscript
          cellLine
        }
        nextToken
      }
      domains {
        items {
          id
          accessionNumber
          type
          start
          end
          gene
          identifier
          color
        }
        nextToken
      }
    }
  }
`;
const defaultHiddenHeaders = []
const tableHeaders = ['gene','sgRNASequence','function', 'aachg', 'clinVar','clinVar_ID','lfcUNT','pvalueUNT','fdrUNT','lfcCISP','pvalueCISP','fdrCISP','lfcCPT','pvalueCPT','fdrCPT','lfcDOX','pvalueDOX','fdrDOX','lfcOLAP','pvalueOLAP','fdrOLAP','tCGA','pTMsiteLoc','noncanonicalTranscript','cellLine']
const tableHeaderTranslation = new Map(
  [
    ['gene', 'Gene'],
    ['sgRNASequence','sgRNA Sequence'],
    ['function', 'Function'],
    ['aachg', 'AA change'],
    ['clinVar', 'ClinVar significance'],
    ['clinVar_ID', 'ClinVar ID'],
    ['lfcUNT', 'LFC Untreated'],
    ['pvalueUNT', 'P-Value Untreated'],
    ['fdrUNT', 'FDR Untreated'],
    ['lfcCISP', 'LFC Cisplatin'],
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
    ['tCGA', 'TCGA'],
    ['pTMsiteLoc', 'PTM site location'],
    ['noncanonicalTranscript', 'Non-Canonical Transcript ID for Function'],
    ['cellLine', 'Cell Line']
  ]
)


export class CandlestickResults extends React.Component<CandlestickProps, CandlestickState> {

    constructor(props) {
        super(props)
        this.state = {
            lollipopsClicked: new Map<string, boolean>(),
            displayGene:"",
            funCheckBoxChecked: new Map<string, boolean>([["nonsense",false], ["missense",false],["splice",false],["synonymous",false],["other",false]]),
            pValueLessThan: new Map<string, boolean>([["UNT",false],["CISP",false],["OLAP",false],["DOX",false],["CPT",false]]),
            radioChecked: new Map<string, boolean>([["UNT",true],["CISP",false],["OLAP",false],["DOX",false],["CPT",false]]),
            radioCheckedCell: new Map<string,boolean>([["MCF10A", true], ["MCF7", false]]),
            curPressedCell: "MCF10A",
            gene: "",
            treatment: "UNT",
            isInSearch:true,
            curGeneList: geneList,
            xMax: 1210,
            renderConfigData: {
                vizHeight: 130, // hardcoded
                vizWidth: 665, // hardcoded
                yMax: 23, // max #mutations
                hugoGeneSymbol: 'Log Fold Change',
                lollipops: [], //data in the table MCF10A
                lollipopsMCF7: [], //data in the table MCF7
              },
              domains: [],
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
      } else if(fun === "splice-donor" || fun === "splice-acceptor") {
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
        API.graphql(graphqlOperation(getGeneLollipopGraph2, query)).then(result => { //query first database
          const filteredLocations = this.filterLocations(result.data.getGeneLollipopGraph.lollipopLocations.items)
          API.graphql(graphqlOperation(getGeneLollipopGraphMCF72, query)).then(secondQueryResult => {//query second database
            const filteredMCF7 = this.filterLocations(secondQueryResult.data.getGeneLollipopGraphMCF7.lollipopLocations.items)
            const xMax:number = parseInt(result.data.getGeneLollipopGraph.numberOfAAS)

            const domains = result.data.getGeneLollipopGraph.domains.items.map(domain => {
              var domainEnd = domain.end > xMax ? xMax : domain.end;
    
  
              return {
                startCodon: domain.start,
                endCodon: domainEnd,
                label: domain.identifier,
                color: domain.color,
                tooltip: {
                  header:domain.identifier,
                  body: (<div>Identifier: {domain.identifier}<br/>Start: {domain.start}<br/>End: {domainEnd}</div>)
                }
              }
            })
            const sortedDomains = domains.sort((domain1, domain2) => {
              const startDiff:number = domain1.startCodon - domain2.startCodon
              if(startDiff==0) {
                return domain1.endCodon - domain2.endCodon;
              }
              return -1;
            })
            this.setState(prevState => {
              return {
                ...prevState,
                numberOfAAS: result.data.getGeneLollipopGraph.numberOfAAS,
                transcriptId: result.data.getGeneLollipopGraph.transcriptId,
                displayGene: this.state.gene,
                domains: sortedDomains,
                xMax: xMax,
                curPressedCell: filteredMCF7.length == 0 ? "MCF10A" : prevState.curPressedCell,
                radioCheckedCell: filteredMCF7.length == 0 ? new Map<string,boolean>([["MCF10A", true], ["MCF7", false]]) : prevState.radioCheckedCell
              }
            })
            this.updateState(filteredLocations, filteredMCF7)
          })
         
        }).catch(err => {
          console.log(err)
        })
    }

    lollipopUIState = (location, isSelected) => {
      return {
        codon: location.aapos,
        count: location['lfc'+this.state.treatment],
        tooltip: {
          body: (<div>sgRNA_sequence: {location.sgRNASequence}
          <br/>lfc_{this.state.treatment}:{location['lfc'+this.state.treatment]}
          <br/>pvalue_{this.state.treatment}:{location['pvalue'+this.state.treatment]}
          <br/>fdr_{this.state.treatment}:{location['fdr'+this.state.treatment]}
          <br/>aachg{this.state.treatment}:{location.aachg}
          <br/>clinVar{this.state.treatment}:{location.clinVar}</div>)
        },
        color: this.colorCode(location.function),
        id: location.id,
        selected: isSelected,
        sgRNA: location.sgRNASequence
      }
    }

    updateState = (filteredLocations, filteredMCF7) => {
          this.setState(prevState => {
            return {
                ...prevState,
                isInSearch: false,
                renderConfigData: {
                    vizHeight: 130, // hardcoded
                    vizWidth: 665, // hardcoded
                    hugoGeneSymbol: 'Log Fold Change',
                    lollipops: filteredLocations,
                    lollipopsMCF7: filteredMCF7
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
        if(treatment === this.state.treatment) {
          return;
        }
        const curCheckedMap = this.state.radioChecked;
        curCheckedMap.set(treatment, true)
        curCheckedMap.set(this.state.treatment, false)
        this.setState(prevState => {
          return {
            ...prevState,
            treatment: treatment,
            radioChecked: curCheckedMap,
            pValueLessThan: new Map<string, boolean>([["UNT",false],["CISP",false],["OLAP",false],["DOX",false],["CPT",false]])
          }
        })
        this.updateState(this.state.renderConfigData.lollipops, this.state.renderConfigData.lollipopsMCF7)
      }
    }

    setPValueLessThan = (treatment:string) => {
      return (e) => {
        if (treatment !== this.state.treatment) {
          return;
        }

        const curPValue = this.state.pValueLessThan;
        const newPValueBool = !curPValue.get(treatment)
        curPValue.set(treatment, newPValueBool)
        this.setState(prevState => {
          return {
            ...prevState,
            pValueLessThan: curPValue,
            lollipopsClicked: prevState.lollipopsClicked
          }
        })
      }
    }
    
    setCellLine = (cellLine:string) => {
      return (e) => {
        if(cellLine === this.state.curPressedCell) {
          return;
        }
        const curCheckedMap = this.state.radioCheckedCell;
        curCheckedMap.set(cellLine, true)
        curCheckedMap.set(this.state.curPressedCell, false)
        this.setState(prevState => {
          return {
            ...prevState,
            cellLine: cellLine,
            radioCheckedCell: curCheckedMap,
            curPressedCell: cellLine,
            lollipopsClicked: new Map<string, boolean>()
          }
        })
        this.updateState(this.state.renderConfigData.lollipops, this.state.renderConfigData.lollipopsMCF7)
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

    lollipopClickCallback = (sgRNA:string) => {
      const mapCopy:Map<string, boolean> = this.state.lollipopsClicked;
      if(this.state.lollipopsClicked.has(sgRNA)) {
        const curState:boolean = this.state.lollipopsClicked.get(sgRNA)
        mapCopy.set(sgRNA, !curState)
      } else {
        mapCopy.set(sgRNA, true)
      }
      this.setState(prevState => {
        return {
          ...prevState,
          lollipopsClicked:mapCopy
        }
      })
    }

    render() {
        console.log(this.state.pValueLessThan)
        var filteredLollipops = this.state.curPressedCell === "MCF10A" ? this.state.renderConfigData.lollipops :  this.state.renderConfigData.lollipopsMCF7 //If then to determine which table to render
        
        var funFilters:string[] = Array.from(this.state.funCheckBoxChecked).filter(funFilter => funFilter[1]).map(funFilter => funFilter[0])
        if (funFilters.length > 0) {
          if(funFilters.includes("splice")){
            funFilters = funFilters.filter(removeSplice => "splice"!== removeSplice)
            funFilters.push("splice-acceptor")
            funFilters.push("splice-donor")
          }
          
          filteredLollipops = filteredLollipops.filter(lollipop =>  funFilters.some(check => check === lollipop.function))
        }

        const pValueFilters:string[] = Array.from(this.state.pValueLessThan).filter(pvalueFilter => pvalueFilter[1]).map(pvalueFilter => pvalueFilter[0])
        if (pValueFilters.length > 0) {
          for(var i=0; i<pValueFilters.length; i++) {
            filteredLollipops = filteredLollipops.filter(lollipop => lollipop['pvalue'+pValueFilters[i]] < 0.01)
          }
        }
        
        const lollipops = filteredLollipops.map(lollipop =>  this.lollipopUIState(lollipop, this.state.lollipopsClicked.has(lollipop.sgRNASequence) ? !this.state.lollipopsClicked.get(lollipop.sgRNASequence) : true))
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
            aapos: Number(filteredLollipop.aapos),
            lfcCISP: Number(filteredLollipop.lfcCISP),
            lfcUNT: Number(filteredLollipop.lfcUNT),
            pvalueUNT: Number(filteredLollipop.pvalueUNT),
            fdrUNT: Number(filteredLollipop.fdrUNT),
            pvalueCISP: Number(filteredLollipop.pvalueCISP),
            fdrCISP: Number(filteredLollipop.fdrCISP),
            lfcCPT: Number(filteredLollipop.lfcCPT),
            pvalueCPT: Number(filteredLollipop.pvalueCPT),
            fdrCPT: Number(filteredLollipop.fdrCPT),
            lfcDOX: Number(filteredLollipop.lfcDOX),
            pvalueDOX: Number(filteredLollipop.pvalueDOX),
            fdrDOX: Number(filteredLollipop.fdrDOX),
            lfcOLAP: Number(filteredLollipop.lfcOLAP),
            pvalueOLAP: Number(filteredLollipop.pvalueOLAP),
            fdrOLAP: Number(filteredLollipop.fdrOLAP),
          }
        })

        const lollipopFilters:string[] = Array.from(this.state.lollipopsClicked).filter(lollipopFilter => lollipopFilter[1]).map(lollipopFilter => lollipopFilter[0])
        if (lollipopFilters.length > 0) {
          const tableFilteredByLollipopFilters = tableLollipops.filter(lollipop => lollipopFilters.some(sgRNA => sgRNA === lollipop.sgRNASequence))
          if (tableFilteredByLollipopFilters.length > 0) {
            tableLollipops = tableFilteredByLollipopFilters
          }
        }
        
        //when MF10A, populate celLIne with MCF10A
        //const populatedLollipop = this.state.curPressedCell === "MCF10A" ? tableLollipops.map(lollipop => {
        //  lollipop["cellLine"] = "MCF10A"
        //  return lollipop
        //}) : tableLollipops 

        //extracts relevant columns for table
        const displayLollipops = tableLollipops.map(lollipop => {
          var newObj = {}
          tableHeaders.forEach(el => newObj[el] = lollipop[el]   )
          return newObj
        })

        const bootStrapHeaders = tableHeaders.map(header => {
          return {
            dataField: header,
            text: tableHeaderTranslation.get(header),
            sort: true,
            order: 'asc',
            hidden: defaultHiddenHeaders.some(defaultHiddenHeader => defaultHiddenHeader === header),
            classes:(cell, row, rowIndex, colIndex) => {
              return colIndex == 1 ? 'breakAll helvetica' : 'breakWords helvetica';
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
                <b>{this.state.displayGene}</b> <i>{this.state.transcriptId}</i>
                <br/>
                <div className="plotLeft">
                  <LollipopPlot
                      domains={this.state.domains}
                      lollipops={lollipops}
                      vizWidth={765}
                      vizHeight={500}
                      hugoGeneSymbol={this.state.renderConfigData.hugoGeneSymbol}
                      xMax={this.state.xMax}
                      options={options}
                      proteinLength={this.state.numberOfAAS}
                      onLollipopClick = {this.lollipopClickCallback.bind(this)}
                  />
                </div>
                <div className="radioRight overlfowAuto">
                  <p className="filterHeaderMain"><b>{"Filters"}</b></p>
                  <div className="filterBox">
                    <div className="filterRow secondFilterRow">
                      <div className="filterColumn">
                        <label className="filterHeader"><b>Treatment</b></label>
                      </div>
                      <div className="filterColumn">
                        <label className="filterHeader"><b>{"p<0.01"}</b></label>
                      </div>
                      <div className= "filterColumn">
                        <label className="filterHeader"><b>Cell Line</b></label>
                      </div>
                    </div>

                    <div className="filterRow secondFilterRow">
                      <div className="filterColumn">
                        <label className="filterBody"><input type="radio" className="rightSideButton" onClick={this.setTreatment("UNT")} checked={this.state.radioChecked.get("UNT")}/>&nbsp;Untreated</label>
                      </div>
                      <div className= "filterColumn">
                        <input type="checkbox" className="rightSideButton" onClick={this.setPValueLessThan("UNT")} checked={this.state.pValueLessThan.get("UNT")}></input>
                      </div>
                      <div className= "filterColumn">
                        <label className="filterBody"><input type="radio" className="rightSideButton" onClick={this.setCellLine("MCF10A")} checked={this.state.radioCheckedCell.get("MCF10A")}/>&nbsp;MCF10A</label>
                      </div>
                      
                    </div>

                    <div className="filterRow secondFilterRow">
                      <div className="filterColumn">
                        <label className="filterBody"><input type="radio" className="rightSideButton" onClick={this.setTreatment("CISP")} checked={this.state.radioChecked.get("CISP")}/>&nbsp;Cisplatin</label>
                      </div>
                      <div className="filterColumn">
                        <input type="checkbox" className="rightSideButton" onClick={this.setPValueLessThan("CISP")} checked={this.state.pValueLessThan.get("CISP")}></input>
                      </div>
                      <div className= "filterColumn">
                        {this.state.renderConfigData.lollipopsMCF7.length > 0 ? <label className="filterBody"><input type="radio" className="rightSideButton" onClick={this.setCellLine("MCF7")} checked={this.state.radioCheckedCell.get("MCF7")}/>&nbsp;MCF7</label> : <label></label>}
                      </div>                      
                    </div>
                    
                    <div className="filterRow secondFilterRow">
                      <div className="filterColumn">
                        <label className="filterBody"><input type="radio" className="rightSideButton" onClick={this.setTreatment("OLAP")} checked={this.state.radioChecked.get("OLAP")}/>&nbsp;Olaparib</label>
                      </div>
                      <div className="filterColumn">
                        <input type="checkbox" className="rightSideButton" onClick={this.setPValueLessThan("OLAP")} checked={this.state.pValueLessThan.get("OLAP")}></input>
                      </div>
                    </div>
                    
                    <div className="filterRow secondFilterRow">
                      <div className="filterColumn">
                        <label className="filterBody"><input type="radio" className="rightSideButton" onClick={this.setTreatment("DOX")} checked={this.state.radioChecked.get("DOX")}/>&nbsp;Doxorubicin</label>
                      </div>
                      <div className="filterColumn">
                        <input type="checkbox" className="rightSideButton" onClick={this.setPValueLessThan("DOX")} checked={this.state.pValueLessThan.get("DOX")}></input>
                      </div>
                    </div>
                    
                    <div className="filterRow secondFilterRow">
                      <div className="filterColumn">
                        <label className="filterBody"><input type="radio" className="rightSideButton" onClick={this.setTreatment("CPT")} checked={this.state.radioChecked.get("CPT")}/>&nbsp;Camptothecin</label>
                      </div>
                      <div className="filterColumn">
                        <input type="checkbox" className="rightSideButton" onClick={this.setPValueLessThan("CPT")} checked={this.state.pValueLessThan.get("CPT")}></input>
                      </div>
                    </div>
                  </div>

                  <br/>
                  <br/>
                  <b>Mutational outcome</b>
                  <br/>
                  <label className="mutationalOutcomeNonsense"><input type="checkbox" onClick={this.setFun("nonsense")} checked={this.state.funCheckBoxChecked.get("nonsense")}/>&nbsp;Nonsense</label>
                  <br/>
                  <label className="mutationalOutcomeMissense"><input type="checkbox" onClick={this.setFun("missense")} checked={this.state.funCheckBoxChecked.get("missense")}/>&nbsp;Missense</label>
                  <br/>
                  <label className="mutationalOutcomeSplice"><input type="checkbox" onClick={this.setFun("splice")} checked={this.state.funCheckBoxChecked.get("splice")}/>&nbsp;Splice</label>
                  <br/>
                  <label className="mutationalOutcomeSilent"><input type="checkbox" onClick={this.setFun("synonymous")} checked={this.state.funCheckBoxChecked.get("synonymous")}/>&nbsp;Silent</label>
                  <br/>
                  <label className="mutationalOutcomeOther"><input type="checkbox" onClick={this.setFun("other")} checked={this.state.funCheckBoxChecked.get("other")}/>&nbsp;Other</label>
                </div>
                <br/>
                <br/>
                <br/>
              </div>
              <div>
              <p className="helvetica reducedMargin">The table below contains information on the lollipops displayed in the plot. Values of individual lollipops will be shown by clicking on them in the plot.</p>
              </div>
              <div>
                <div> 
                <ToolkitProvider
                  keyField='sgRNASequence' 
                  columns ={bootStrapHeaders}
                  data={displayLollipops}
                  bootstrap4={true}
                  striped
                  condensed={true}
                  defaultSorted = {
                    [
                      {
                        dataField:'aapos',
                        order: 'asc'
                      }
                    ]}
                >
                  {
                    props => (
                      <div>
                        <ExportCSVButton { ...props.csvProps }>Export CSV</ExportCSVButton>
                        <hr />
                        <BootstrapTable classes ="table-responsive scrollBarTable" tdStyle={{whiteSpace:'normal'}}
                          {...props.baseProps}/>
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
            <Router basename="/">
              <Navbar bg="dark" variant="dark">
                <Navbar.Collapse>
                  <Nav className="ml-auto">
                    <Nav.Link href="https://www.ciccialab.com">
                      <i className="glyphicon glyphicon-home"></i> Ciccia Lab
                    </Nav.Link>
                    <span className="nav-link" onClick={this.props.setMode}>iSTOP</span>
                  </Nav>
                </Navbar.Collapse>
              </Navbar>
              <Switch/>
            </Router>
           
            <div>
                <form onSubmit={this.handleSubmit}>
                    <h2 className="helvetica">Functional interrogation of DNA damage response variants with base editing screens</h2>
                    <p className="filterBody">For more information, please click here: <a href="https://www.cell.com/cell/fulltext/S0092-8674(21)00084-2"> Cuella-Martin <i>et al.</i>. Cell. 2021; 184(4): P1081-1097.E19</a></p>
                    <br/>
                    <p className="filterHeaderMain">Gene Search</p>
                    <b><p className="helvetica reducedMargin">Filter Box</p></b>
                    <p className="helvetica reducedMargin">Write the initial characters of the gene name and select it from the drop down list</p>
                    <input className="smallerInput" type="text" name="filter" onChange={this.filterDropDown}/>
                    <select className="submitAlign" onChange={this.dropDownChange}> {this.state.curGeneList.map((typeName) => <option key={typeName}>{typeName}</option>)} </select>
                    <br/>
                    <input type="submit" value="Submit"/>
                    <br/>
                </form>
            </div>
            {toDisplay}  
          </div>
        )
    }
}
