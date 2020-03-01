import * as React from "react";   

interface DownloadDatasetsProps {
    links: link[];
}

export interface link {
    text: string;
    link: string;
}

interface DownloadDatasetsState {
    link: string;
}

export class DownloadDatasets extends React.Component<DownloadDatasetsProps, DownloadDatasetsState> {
    constructor(props) {
        super(props);
    }

    handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {

    }

    render() {
        var linkElements = this.props.links.map(link => <div><a href={link.link}>{link.text}</a><br/></div>)
        return (
            <div>
                <h2>Download the entire dataset for a species of interest</h2>
                <p>Click on the links to download the entire dataset for each species</p>
                {linkElements}
            </div>
        )
    }
}