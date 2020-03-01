import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { GeneSearch } from "../components/GeneSearch";
import { CancerSearch } from "../components/CancerSearch";
import { DownloadDatasets } from "../components/DownloadDatasets/DownloadDatasets";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

interface SearchContainerProps {
}

interface SearchContainerState {

}

export class SearchContainer extends React.Component<SearchContainerProps, SearchContainerState> {
    constructor(props: SearchContainerProps) {
        super(props);
    }


    render() {
        console.log("in search");
        var geneSearchSpecies = ["Homo Sapiens", "Saccharomyces cerevisiae", "Danio rerio", "Mus musculus", "Arabidopsis thaliana",
        "Drosophila melanogaster", "Rattus norvegicus", "Caenorhabditis elegans"];

        var cancerTypes = ["Any", "Bladder", "Blood", "Bone", "Breast", "Cervical", "Colorectal", "Endometrial", "Glioma",
        "Kidney", "LIver", "Lung", "Malignant melanoma", "Non-melanoma skin", "Ovarian", "Pancreatic", "Prostate",
        "Stomach", "Thyroid", "Upper aerodigestive", "Other"];
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
                        <GeneSearch label="Species" types={geneSearchSpecies}/>
                    </TabPanel>
                    <TabPanel>
                        <h1>Search for sgSTOPs to model nonsense mutations identified in cancer</h1>
                        <CancerSearch label="Cancer Types" types={cancerTypes}/>
                    </TabPanel> 
                    <TabPanel>
                        <DownloadDatasets links={links}/>
                    </TabPanel>
                </Tabs>           
            </div>
        )
    }
}
