import * as React from "react";
import { GeneSearch } from "../../components/GeneSearch";
import { CancerSearch } from "../../components/CancerSearch";
import { DownloadDatasets } from "../../components/DownloadDatasets/DownloadDatasets";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import {SearchState} from '../../components/GeneSearch'
import {gene, geneYeast, geneFish, geneMouse, geneFly, geneNematode, genePlant, geneRat/*, geneCosmic*/ } from "../../graphql/queries"
import {QueryResults} from '../../components/QueryResults'
import Button from 'react-bootstrap/Button'
import {CandlestickResults} from '../../components/CandlestickPlot'

interface SearchContainerProps {
}

interface SearchContainerState {
    queryValues: Object[]
    queryColumns: string[]
    isInSearch: boolean;
}

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

export class SearchContainer extends React.Component<SearchContainerProps, SearchContainerState> {
    constructor(props: SearchContainerProps) {
        super(props);
        this.state = {
            queryValues: [],
            queryColumns: [],
            isInSearch: true
        }
    }

    receiveState(queryValues:Object[], queryColumns:string[], type:string) {
        this.setState({
            queryValues: queryValues,
            queryColumns: queryColumns,
            isInSearch: false
        })
    }

    geneCallBack(searchState:SearchState) {
        const geneQuery = { 
            limit: 1000000,
            gene: searchState.genes
          }
          
        const query = tableToQuery.get(searchState.type);
        return [gene, geneQuery]
    }
    goBack = (e) => {
        this.setState(prevState => {
          return {
            isInSearch:true,
            queryValues: [],
            queryColumns: [],
          }
        })
      }
    render() {
        var geneSearchSpecies = ["Homo Sapiens", "Saccharomyces cerevisiae", "Danio rerio", "Mus musculus", "Arabidopsis thaliana",
        "Drosophila melanogaster", "Rattus norvegicus", "Caenorhabditis elegans"];

        var links = [
            {link: "http://dx.doi.org/10.17632/xbdtvf6bvj.1", text:"Complete iSTOP Datasets"},
            {link: "http://data.mendeley.com/datasets/xbdtvf6bvj/1/files/7c8f0507-8ed7-4bf5-8274-0f419fa454e9/H.sapiens-hg38.csv?dl=1", text:"H. sapiens Dataset"},
            {link: "https://data.mendeley.com/datasets/xbdtvf6bvj/1/files/f6fd90c2-45ff-42f6-b1c0-12124a8d025f/M.musculus-mm10.csv?dl=1", text:"M. musculus Dataset"},
            {link: "https://data.mendeley.com/datasets/xbdtvf6bvj/1/files/75e4cc53-2d3c-4011-8ca5-ffb4831467cb/R.norvegicus-rn6.csv?dl=1", text:"R. norvegicus Dataset"},
            {link: "https://data.mendeley.com/datasets/xbdtvf6bvj/1/files/630c9c88-1ddb-4f0d-985e-8be3d397aae0/D.rerio-danRer10.csv?dl=1", text:"D. rerio Dataset"},
            {link: "https://data.mendeley.com/datasets/xbdtvf6bvj/1/files/95ce6097-f988-4574-9eb1-c201bb6110f0/C.elegans-ce11.csv?dl=1", text:"C. elegans Dataset"},
            {link: "https://data.mendeley.com/datasets/xbdtvf6bvj/1/files/65a61811-331f-41f2-b86a-9b68ec85b2e8/D.melanogaster-dm6.csv?dl=1", text:"D. melanogaster Dataset"},
            {link: "https://data.mendeley.com/datasets/xbdtvf6bvj/1/files/521c496c-7f7d-498e-a966-9657118f5656/A.thaliana-plantsmart28.csv?dl=1", text:"A. thaliana Dataset"},
            {link: "https://data.mendeley.com/datasets/xbdtvf6bvj/1/files/b84cdd0b-c283-4f90-8f2a-8b802ac703ad/S.cerevisiae-sacCer3.csv?dl=1", text:"S. cerevisiae Dataset"},
        ]

        const toDisplay = this.state.isInSearch 
        ? <GeneSearch 
            receiveState={this.receiveState.bind(this)} 
            label="Species" types={geneSearchSpecies} 
            parameterBuilder={this.geneCallBack} 
            customDataPrune={result => result}
            isCancerSearch={false}
            /> 
        :  <div>
                <QueryResults 
                    data={this.state.queryValues} 
                    columnDefinition={this.state.queryColumns}/>
                <br/>
                <Button onClick={this.goBack}>Go Back</Button>
            </div>

        return (
            <div>
                <Tabs transition="true">
                    <TabList>
                        <Tab>Gene Search</Tab>
                        <Tab>Cancer Search</Tab>
                        <Tab>Download Datasets</Tab>
                    </TabList>

                    <TabPanel>
                        <h1>Search for genes</h1>
                        {toDisplay}
                    </TabPanel>
                    <TabPanel>
                        <h1>Search for sgSTOPs to model nonsense mutations identified in cancer</h1>
                        <CancerSearch/>
                    </TabPanel>
                    <TabPanel>
                        <DownloadDatasets links={links}/>
                    </TabPanel>
                </Tabs>           
            </div>
        )
    }
}
