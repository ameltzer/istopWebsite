import * as React from "react";
import { SearchContainer } from "../../../containers/SearchContainer";
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import {
  HashRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
interface ISTOPWebsiteProps {
  setMode: (e) => void
}

interface randomInterface {
  
}


interface ISTOPWebsiteState {

}



export class ISTOPWebsite extends React.Component<ISTOPWebsiteProps, ISTOPWebsiteState> {

    constructor(props) {
        super(props)
    }
    goToDDRVariants(e) {
      console.log("hi")
    }
    
    render() {
        return (
          <Router basename="/">
    <>
      <header>
        <h1>Welcome to iSTOP! </h1>
        <h2> A database of sgRNAs for generating STOP codons (sgSTOPs) 
              using CRISPR-dependent base editing </h2>
      </header>
      <Navbar bg="dark" variant="dark">
        <Navbar.Collapse>
          <Nav>
            <Navbar.Brand>
              <Link to="/"/>
            </Navbar.Brand>
            <Navbar.Brand>
              <Link to="/" className="bannerLink">Home</Link>
            </Navbar.Brand>
            <Navbar.Brand>
              <Link to="/faq" className="bannerLink">FAQ</Link>
            </Navbar.Brand>
          </Nav>
          <Nav className="ml-auto">
            <Nav.Link href="https://www.ciccialab.com">
              <i className="glyphicon glyphicon-home"></i> Ciccia Lab
            </Nav.Link>
            <span className="nav-link pointer" onClick={this.props.setMode}>DDR Variants</span>
          </Nav>
          
        </Navbar.Collapse>
      </Navbar>
      
      <Switch>
        <Route exact path="/">
          <div className="sidenav">
            <h1> About iSTOP </h1>
            <p> Please see <a href= "http://www.cell.com/molecular-cell/fulltext/S1097-2765(17)30605-6">CRISPR-mediated base editing enables efficient disruption of eukaryotic genes through induction of STOP codons (iSTOP)", Billon P., Bryant E. <i> et al</i>. Molecular Cell, 2017</a></p> 

            <h2> Software</h2>
            <p> <a href= "http://www.github.com/CicciaLab/iSTOP">iSTOP R Package</a>-Design iSTOP guides for any annotated genome</p>
            <p> <a href= "http://www.github.com/CicciaLab/iSTOP-paper">iSTOP paper</a>-Reproduce figures from Billon P., Bryant E. <i>et al</i>. Molecular Cell, 2017</p>
          </div>
          <article>
            <SearchContainer />
          </article>
        </Route>
        <Route path="/faq">
          <div>
            <h3>How does it work?</h3>
            <p>CRISPR-mediated base editing enables programmable DNA base conversion without DNA double-strand break formation (<a href="https://www.nature.com/nature/journal/v533/n7603/full/nature17946.html">Komor et al. Nature 2016</a>). Different generations of CRISPR base editors (BE1, BE2, BE3 and BE3 variants) can convert cytidine to uridine, resulting in C -&gt; T and G -&gt; A substitutions in the genome. We and others (<a href="http://www.cell.com/molecular-cell/fulltext/S1097-2765(17)30605-6"> Billon P., Bryant E. <i>et al</i>. Molecular Cell, 2017</a>; <a href="https://www.nature.com/nmeth/journal/v14/n7/abs/nmeth.4327.html">Kuscu et al. Nature Methods 2017</a>) have demonstrated that CRISPR-mediated base editing is an efficient system for introducing premature stop codons in human cells, resulting in the generation of gene knock-outs. Induction of STOP codons (iSTOP) is mediated by sgRNAs for iSTOP (named sgSTOPs) targeting 4 different codons (CAA, CAG, CGA, and TGG) located at a precise distance from a protospacer adjacent motif (PAM). CAA, CAG, and CGA codons can be converted into STOP codons when targeted on the coding strand, while TGG can be converted into STOP codons if targeted on the non-coding strand.</p>
            <h2><u>The Table</u></h2>
            <table className="table table-striped">
              <thead>
                <tr>
                    <th>Column Name</th>
                    <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                    <td>Gene Name</td>
                    <td>Gene symbol (UCSC gene names for all species except <i>A. thaliana</i>, which uses TAIR gene names)</td>
                </tr>
                  <tr>
                      <td>Relative Position in Largest Isoform</td>
                      <td>Relative position in the largest gene isoform of the coordinate of the targeted base (0= the beginning of the coding sequence, 1= the end of the coding sequence)</td>
                </tr>
                <tr>
                      <td>No Upstream G</td>
                      <td>TRUE= no G is located on the immediate 5'-side of the targeted base</td>
                </tr>
                <tr>
                        <td>RFLP Loss</td>
                        <td>Restriction enzymes that uniquely cut +/- 50 bases of genomic sequence from the targeted base <b>before</b> editing. Multiple enzymes are separated by "|".</td>
                </tr>
                <tr>
                      <td>RFLP Gain</td>
                      <td>Restriction enzymes that uniquely cut +/- 50 bases of genomic sequence from the targeted base <b>after</b> editing. Multiple enzymes are separated by "|".</td>
              </tr>
              <tr>
                      <td>NMD Prediction (%)</td>
                      <td>Percentage of isoforms predicted to incur nonsense-mediated decay. This prediction is based on the targeting of an isoform's coding sequence 55 bases upstream of the final exon-exon junction</td>
                </tr>
                <tr>
                      <td>PAM:   </td>
                      <td>The 20nt guide sequence for the corresponding PAM (targeted c is lowercase)</td>
                </tr>
                <tr>
                    <td>Off-Target Prediction PAM:    </td>
                    <td>Number of sequences that may be unintentionally targeted by the sgSTOP. Sequences matching sgRNAs (including the PAM) are searched in the genome while allowing up to two mismatches in positions 1-8 of the seed sequence.</td>
                </tr>
                <tr>
                    <td>Cancer type(s)</td>
                    <td>Cancer type(s) in which the sgSTOP is predicted to model a nonsense mutation observed. Multiple cancer types are separated by "|". Only for <i>H.sapiens</i>.</td>
              </tr>
              <tr className="danger">
                    <td>Chromosome</td>
                    <td>Chromosome Name/Number</td>
                </tr>
                <tr className="danger">
                    <td>Strand</td>
                    <td>Strand of the targeted base in the coding sequence</td>
                </tr>
                <tr className="danger">
                    <td>Genomic Coordinate</td>
                    <td>Genomic coordinate of the targeted base</td>
                </tr>
                <tr className="danger">
                      <td>Targeted Codon</td>
                      <td>Codon that is targeted</td>
                </tr>
                <tr className="danger">
                    <td>Number of Isoforms</td>
                    <td>Number of isoforms considered for the gene</td>
                </tr>
                <tr className="danger">
                    <td>Percent Isoforms</td>
                    <td>Percentage of the isoforms that are targeted at the coordinate of the targeted base</td>
                </tr>
              </tbody>
            </table> 
            <h3>Why can’t I see some of the columns?</h3>
            <p>The table is responsive to the size of the browser window which may lead some columns to be hidden. Please click the "+" sign (within the "Gene Name" column) to see those hidden columns for the corresponding row. If there is no "+" sign within the "Gene Name" column then all of the columns are being displayed. Furthermore, use the “column visibility” button to show/hide the columns you do not want to see. In parallel, it is possible to select specific parameters in “Advanced Search” to restrict the number of columns. Finally, we recommend clicking on the “Download Table (Excel)” or "Download Table (.csv)" buttons to download the result as a separate excel file (.xlsx) or comma separate value (.csv) file.
            </p>

            <h3>How do I find the targeted base in the sgSTOP sequence?</h3>
            <p>The lower case letter indicates the <b>targeted base</b>. For example: TTTT<b>c</b>AGCTTGACACAGGTT.
            </p>

            <h3>What are the hyperlinks on the sgSTOPs and how do I use them?</h3>
            <p><b>The links will only work for organisms in the UCSC genome browser.</b> These links will direct users to the results page of the UCSC genome browser BLAT search for the sequence clicked. <b>IMPORTANT!</b> Before clicking the link on each sgSTOP sequence, make sure to set the BLAT search in the UCSC genome browser to the organism that you want to search by clicking  <a href="http://genome.ucsc.edu/cgi-bin/hgBlat">here</a>. For example, if you are searching for your gene of interest in humans please select "Human" in the "Genome" drop-down. To make sure you are in the proper BLAT search, then check the upper left corner and it should say "Human BLAT Search". Then click on the sgSTOP link and it will automatically search for the indicated sgSTOP in the UCSC genome browser.</p>
            <h2><u>The Search</u></h2>
            <h3 >How can I select sgSTOPs to introduce stop codons into my favorite gene using base editing?</h3>
            <p>In “Gene Search”, select the species using the drop-down menu and input the name of your favorite gene. Then click “Submit” to get the list of <b>all</b> the sgSTOPs available in your gene. In "Cancer Search", select the cancer type of interest with (left side) or without (right side) selecting your favorite gene using the drop-down menu and then click "Submit". The right side allows users to restrict the search in <i>Homo sapiens</i> for sgSTOPs that model nonsense mutations identified in cancer. The left side allows users to get a list of all the sgSTOPs for any gene that would model nonsense mutations in that cancer type.   
            To restrict the number of sgSTOPs, we strongly recommend using the “Advanced Search” feature to filter the search. Especially, we suggest selecting for sgSTOPs that can be easily monitored on a gel using a Restriction Fragment Length Polymorphism (RFLP) Assay and have the maximum on-target efficiency (see details below).</p>

            <h3 >The table uses UCSC or TAIR gene names, can the search recognize some aliases?</h3>
            <p>Yes! For many of the species, you can search for your gene of interest using an alias. For example, you can search for "tip60" in <i>H. sapiens</i> and obtain the sgSTOPs for KAT5 (UCSC gene name). For <i>C. elegans</i> and <i>A. thaliana</i> we suggest using the UCSC and TAIR gene names, respectively, since the alias list is not as comprehensive.</p>


            <h3 >What are the different parameters in the “Advanced Search”?</h3>
            <p><b>PAM:</b> Different BE3 variants available to introduce STOP codons (for details see <a href="https://www.nature.com/nbt/journal/v35/n4/full/nbt.3803.html">Kim et al. Nature Biotechnology 2017</a>)</p>

            <p>To express the CRISPR base editors in mammalian cells, use the plasmids created by Komor et al. Nature 2016 and Kim et al. Nature Biotechnology 2017, as indicated below:</p>
            <p>PAM: NGG, Base editor: BE3, plasmid on <a href="https://www.addgene.org/73021/">Addgene #73021</a></p>
            <p>PAM: NGA, Base editor: VQR-BE3, plasmid on <a href="https://www.addgene.org/85171/">Addgene #85171</a></p> 
            <p>PAM: NGAG, Base editor: EQR-BE3, plasmid on <a href="https://www.addgene.org/85172/">Addgene #85172</a></p>
            <p>PAM: NGCG, Base editor: VRER-BE3, plasmid on <a href="https://www.addgene.org/85173/">Addgene #85173</a></p>
            <p>PAM: NNGRRT, Base editor: SaBE3, plasmid on <a href="https://www.addgene.org/85169/">Addgene #85169</a></p>
            <p>PAM: NNNRRT, Base editor: SaKKH-BE3, plasmid on <a href="https://www.addgene.org/85170/">Addgene #85170</a></p>
            <p><b>Off-target Prediction:</b> Preliminary prediction on the uniqueness of the guides into the selected genome. This search tolerates 2 mismatches in positions 1 to 8 of the sgRNA.</p> 

            <p><b>NMD Prediction (%):</b> Percentage of isoforms predicted to produce Nonsense Mediated Decay (NMD) from the insertion of a stop codon by the sgSTOP.</p>

            <p><b>RFLP Assay: </b>sgSTOPs that can be monitored on a gel by RFLP assay (see our paper Billon P., Bryant E. <i> et al</i>. Molecular Cell, 2017). This assay can monitor the efficiency of iSTOP-mediated base editing in cellular populations and clones.</p>

            <p><b>Upstream G:</b> sgSTOPs that do not have a G on the immediate 5'-side of the targeted base. These guides are expected to be more efficient.</p>
            <h3>How does the RFLP assay work?</h3>
            <p>The RFLP assay relies on the amplification of a targeted locus by PCR and digestion by a specific restriction enzyme.
            </p>
            <p>Two situations are possible:
            </p><p>1- Restriction site(s) overlap with the targeted base. The transition of the base destroys the restriction site(s), thereby making an edited PCR product refractory to digestion. This can be detected on a gel. Find the list of the restriction sites(s) available for a given guide in the “loss” column.
            </p>
            <p>2- Restriction site(s) are created by the transition of the targeted base. The change of the targeted base creates a restriction site that can be monitored by digestion on gel. Find the list of the restriction site(s) in the gain column. <i>It is important to note that monitoring for the gain of a restriction site may underestimate the real base editing efficiency since several bases can be modified in the window of high activity of BE3, hindering the creation of the restriction site.</i></p>
            <p>The restriction sites displayed in the “gain” and “loss” columns have been selected because they are unique within a window of [-50bp , +50bp] around the targeted base(s). This allows users to <b>amplify by PCR</b> a minimal region of <b>100bps</b>, which can be easily digested and monitored on a gel. However, we encourage users to map the genomic loci around the targeted bases to ensure efficient PCR amplification of the locus of interest.
            </p>
            <p>For testing these detection methods we invite users to try the sgSTOP targeting the gene <b>SPRTN</b> (5'-GGGCCAGCTGGAGGCCGTCG-3'). Base editing with this sgSTOP can be detected by both the gain and loss of a restriction site (see Figure 2C in Billon P., Bryant E. <i> et al</i>. Molecular Cell, 2017). Plasmids that express the SPRTN sgSTOP alone or in combination with an sgRNA targeting ATP1A1, a gene used for co-selection strategies (see Figure 3 in Billon P., Bryant E. <i> et al</i>. Molecular Cell, 2017), will be made available on Addgene.</p>
            <h4>Amplifying the SPRTN locus and checking by RFLP assay</h4>
            <p>
            Briefly, amplify the SPRTN locus using the primers PB571 5’-GCAAAGAGTAAAGGCTGAAACTAGC-3’ and PB572 5’-CACTATCATAAGGCAAATCAGGAAC-3’.</p>
            <p> Next digest the PCR amplicons. A PvuII site will be efficiently lost upon base editing while an NheI site will be created. Therefore, PCR amplicons containing the editited base will be refractory to PvuII digestion but proficient for NheI digestion. However, if there is no base editing, then the PCR amplicons will be digested by PvuII but not NheI.
            <p>(Note: Digestion with NheI underestimates the efficiency of base editing because a second base can be potentially edited leading to the inactivation of the new NheI restriction site)</p>
            <h3>What makes an efficient guide?</h3>
            <p>The presence of a G upstream of the targeted base strongly inhibits BE3 activity. Guides expected to be less efficient due to the presence of a G can be removed from the search by selecting the “Upstream G” box in “Advanced Search”.
            If the users wants to knock-out their gene of interest, it is preferred to select sgSTOPs predicted to induce nonsense-mediated decay (NMD).
            </p>
            <h3>Why is the NMD prediction shown as a percentage?</h3>
            <p>The number represents the percentage of isoforms for the given gene that are predicted to be affected by NMD after insertion of a stop codon using the specified sgSTOP.
            </p>
            <h3>What does the “Off-target Prediction” column mean?</h3>
            <p>The “Off-target Prediction” column indicates the number of off-target positions in the genome that match the guide sequence (including the PAM) allowing for up to two mismatches in the first 8 positions of the guide (positions 1-8 of the seed sequence).
            Guides with an Off-target Prediction greater than 0 can be removed by selecting the “No off-targets” box under "Off-target Prediction" in “Advanced Search”.
            </p>
            <p>For more advanced off-target prediction, please consider using one of the following tools:</p>
            <p>1) <a href="http://crispr.mit.edu">CRISPR Design (Feng Zhang, MIT)</a></p>
            <p>2) <a href="http://portals.broadinstitute.org/gpp/public/">CRISPR Design tools (The Broad Institute)</a></p>
</p>
          </div>
        </Route>
      </Switch>
    </>
    </Router>
        )
    }

}