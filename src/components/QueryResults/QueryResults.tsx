import * as React from "react";
import 'datatables.net-dt/css/jquery.dataTables.min.css'
import 'datatables.net-responsive-dt/css/responsive.dataTables.min.css'
import 'jquery-ui/themes/base/all.css'
const $ = require('jquery');
import 'jquery-ui/ui/widgets/tooltip';
$.DataTable = require( 'datatables.net' );
import 'datatables.net-dt/css/jquery.dataTables.css';
require( 'datatables.net-buttons/js/dataTables.buttons.min' );
const jzip = require( 'jzip');
require( 'datatables.net-buttons/js/buttons.html5.min' );
import 'datatables.net-buttons-dt/css/buttons.dataTables.css'
declare global {
    interface Window { JSZip: any; }
}
window.JSZip = jzip;
require( 'datatables.net-buttons/js/buttons.colVis.js' );
require( 'datatables.net-responsive-dt' )

export interface QueryResultsProps {
  data: Object[],
  columnDefinition:string[]
}
const tableColumnTranslation:Map<string, string> = new Map<string, string>(
  [
    ['gene','Gene Name'],
    ['chr', 'Chromosome'],
    ['strand', 'Strand'],
    ['genome_coord', 'Genomic Coordinate'],
    ['codon', 'Targeted Codon'],
    ['n_tx_in_gene', 'Number Of Isoforms'],
    ['percent_tx','Percent Isoforms'],
    ['rel_pos_largest_isoform','Relative Position in Largest Isoform'],
    ['no_upstream_G','No Upstream G'],
    ['rFLP_Loss','RFLP Loss'],
    ['rFLP_Gain','RFLP Gain'],
    ['percent_NMD','NMD Prediction (%)'],
    ['sgNGG','PAM: NGG'],
    ['sgNGG_matches','Off-target Prediction PAM: NGG'],
    ['sgNGG_spacing','Spacing PAM: NGG'],
    ['sgNGA','PAM: NGA'],
    ['sgNGA_matches','Off-target Prediction PAM: NGA'],
    ['sgNGA_spacing','Spacing PAM: NGA'],
    ['sgNGCG','PAM: NGCG'],
    ['sgNGCG_matches','Off-target Prediction PAM: NGCG'],
    ['sgNGCG_spacing','Spacing PAM: NGCG'],
    ['sgNGAG','PAM: NGAG'],
    ['sgNGAG_matches','Off-target Prediction PAM: NGAG'],
    ['sgNGAG_spacing','Spacing PAM: NGAG'],
    ['sgNNGRRT','PAM: NNGRRT'],
    ['sgNNGRRT_matches','Off-target Prediction PAM: NNGRRT'],
    ['sgNNGRRT_spacing','Spacing PAM: NNGRRT'],
    ['sgNNNRRT','PAM: NNNRRT'],
    ['sgNNNRRT_matches','Off-target Prediction PAM: NNNRRT'],
    ['sgNNNRRT_spacing','Spacing PAM: NNNRRT'],
    ['cancer_type', 'Cancer Type(s)']
  ]
)
var dataTable = null;
export class QueryResults extends React.Component<QueryResultsProps>
{
  constructor(props) {
    super(props)
  }
  handleResize() {
    if(dataTable) {
      dataTable.columns.adjust().draw()
    }
  }
  componentDidMount() {
    $("body").tooltip({
        selector: '[data-toggle="tooltip"]',
        container: 'body'
    });
    var dt = $("#dataTable").DataTable( { 
      dom: 'Bfrtip',
      buttons:[
        'colvis',
        { extend: 'excelHtml5', text: 'Download Table (Excel)'},
        { extend: 'csvHtml5', text: 'Download Table (.csv)'},
        'pageLength'
      ],
      responsive: true,
      "order":[[7,"asc"]],
      "lengthMenu": [ [10, 25, 50, -1], [10, 25, 50, "All"] ],
       columnDefs: [
        { "visible": false, "targets": [1] },
        { "visible": false, "targets": [2] },
        { "visible": false, "targets": [3] },
        { "visible": false, "targets": [4] },
        { "visible": false, "targets": [5] },
        { "visible": false, "targets": [6] },
       ]
      } );
      dataTable = dt;
      dataTable.columns.adjust().draw()
      
      window.addEventListener('resize', this.handleResize)

      $('#dataTable').on( 'column-visibility.dt', function ( e, settings, column, state ) {
        if(dataTable) {
          dataTable.columns.adjust().draw()
        }
    } );
  }

  componentWillUnmount(){
    $('.data-table-wrapper')
    .find('table')
    .DataTable()
    .destroy(true);
  }
  shouldComponentUpdate() {
    return false;
  }

  render() {
    const table = 
      <table ref="main" id="dataTable" className="display table" cellSpacing="0">
        <thead>
          <tr>
              {this.props.columnDefinition.map(column => <th>{tableColumnTranslation.get(column)}</th>)}
          </tr>
        </thead>
        <tbody>
          {
          this.props.data.map(row => 
            <tr>
              {
                this.props.columnDefinition.map(column => 
                  {
                    var cell = <td>{row[column]}</td>;
                    if (column === "gene") {
                      cell = <td datatable-toggle="tooltip" title="Click here to see more information about the sgSTOPs"> {row[column]}</td>
                    }
                    else if(column === "sgNGG" || column === "sgNGA" || column === "sgNGCG" || column === "sgNGAG" || column === "sgNNGRRT" || column === "sgNNNRRT") {
                      const url = "http://genome.ucsc.edu/cgi-bin/hgBlat?type=BLAT%27s+guess&userSeq=" +row[column];
                      cell =<td><a href={url}>{row[column]}</a></td>
                    }
                    return cell
                  }
                )
              }
            </tr>
          )
          }
        </tbody>
      </table>;

    return (
    <div>
      <style dangerouslySetInnerHTML={{__html: `
          body {
            padding: 10px;
            padding:0;
            margin:0
          }
          #divTable{
            width:100%
          }
          table{
            border-collapse: collapse;
            text-align: center;
          }
          table,th,td{
            border: 1px solid black;
            border-collapse: collapse;
            white-space: nowrap;
          }
          th{
            background-color: black;
            color: white;
            text-align: center;
          }
          tr:nth-child(odd) {
            background-color: Aliceblue;
          }
          tr:nth-child(even) {
             background-color: mintcream;
          }
          .dataTables_scroll
          {
              overflow:auto;
          }
          .dt-button-collection {
            display: block;
            height: 450px !important;
            overflow-y: scroll !important;
        }
    ` }} />
      <p>
          The lower case letter indicates <b>targeted base</b>.
          <br/>
          Example: GTTCCC<b>c</b>AATTGAAAGTTGC
        </p>
        <br/>
        <b>Using the links</b>
        (only for organisms in the UCSC genome browser): Before clicking the link on each sgSTOP sequence, make sure to set the BLAT search in the UCSC genome browser to the organism that you want to search by clicking <a href="http://genome.ucsc.edu/cgi-bin/hgBlat">here</a>
        . Then click on the link and it will automatically search for the sgSTOP in the UCSC genome browser.      <br/>
        <br/>
        <br/>
        {table}
      <br/>
    </div>
    )
    
  }
}