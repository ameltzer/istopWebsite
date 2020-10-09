// tslint:disable
// this is an auto generated file. This will be overwritten

export const getHomoSapiens = /* GraphQL */ `
  query GetHomoSapiens($id: ID!) {
    getHomoSapiens(id: $id) {
      aa_target
      chr
      codon
      gene
      genome_coord
      id
      n_tx_in_gene
      no_upstream_G
      percent_NMD
      percent_tx
      rel_pos_largest_isoform
      rFLP_Gain
      rFLP_Loss
      sgNGA
      sgNGA_matches
      sgNGA_spacing
      sgNGG
      sgNGG_matches
      sgNGG_spacing
      sgNGAG
      sgNGAG_matches
      sgNGAG_spacing
      sgNGCG
      sgNGCG_matches
      sgNGCG_spacing
      sgNNGRRT
      sgNNGRRT_matches
      sgNNGRRT_spacing
      sgNNNRRT
      sgNNNRRT_matches
      sgNNNRRT_spacing
      strand
      cancer_type
      createdAt
      updatedAt
    }
  }
`;
export const listHomoSapienss = /* GraphQL */ `
  query ListHomoSapienss(
    $filter: ModelHomoSapiensFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listHomoSapienss(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        aa_target
        chr
        codon
        gene
        genome_coord
        id
        n_tx_in_gene
        no_upstream_G
        percent_NMD
        percent_tx
        rel_pos_largest_isoform
        rFLP_Gain
        rFLP_Loss
        sgNGA
        sgNGA_matches
        sgNGA_spacing
        sgNGG
        sgNGG_matches
        sgNGG_spacing
        sgNGAG
        sgNGAG_matches
        sgNGAG_spacing
        sgNGCG
        sgNGCG_matches
        sgNGCG_spacing
        sgNNGRRT
        sgNNGRRT_matches
        sgNNGRRT_spacing
        sgNNNRRT
        sgNNNRRT_matches
        sgNNNRRT_spacing
        strand
        cancer_type
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getYeast = /* GraphQL */ `
  query GetYeast($id: ID!) {
    getYeast(id: $id) {
      aa_target
      chr
      codon
      gene
      genome_coord
      id
      n_tx_in_gene
      no_upstream_G
      percent_NMD
      percent_tx
      rel_pos_largest_isoform
      rFLP_Loss
      rFLP_Gain
      sgNGA
      sgNGA_matches
      sgNGA_spacing
      sgNGG
      sgNGG_matches
      sgNGG_spacing
      sgNGAG
      sgNGAG_matches
      sgNGAG_spacing
      sgNGCG
      sgNGCG_matches
      sgNGCG_spacing
      sgNNGRRT
      sgNNGRRT_matches
      sgNNGRRT_spacing
      sgNNNRRT
      sgNNNRRT_matches
      sgNNNRRT_spacing
      strand
    }
  }
`;
export const listYeasts = /* GraphQL */ `
  query ListYeasts(
    $filter: ModelYeastFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listYeasts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        aa_target
        chr
        codon
        gene
        genome_coord
        id
        n_tx_in_gene
        no_upstream_G
        percent_NMD
        percent_tx
        rel_pos_largest_isoform
        rFLP_Loss
        rFLP_Gain
        sgNGA
        sgNGA_matches
        sgNGA_spacing
        sgNGG
        sgNGG_matches
        sgNGG_spacing
        sgNGAG
        sgNGAG_matches
        sgNGAG_spacing
        sgNGCG
        sgNGCG_matches
        sgNGCG_spacing
        sgNNGRRT
        sgNNGRRT_matches
        sgNNGRRT_spacing
        sgNNNRRT
        sgNNNRRT_matches
        sgNNNRRT_spacing
        strand
      }
      nextToken
    }
  }
`;
export const getFish = /* GraphQL */ `
  query GetFish($id: ID!) {
    getFish(id: $id) {
      aa_target
      chr
      codon
      gene
      genome_coord
      id
      n_tx_in_gene
      no_upstream_G
      percent_NMD
      percent_tx
      rel_pos_largest_isoform
      strand
      rFLP_Gain
      rFLP_Loss
      sgNGA
      sgNGA_matches
      sgNGA_spacing
      sgNGG
      sgNGG_matches
      sgNGG_spacing
      sgNGAG
      sgNGAG_matches
      sgNGAG_spacing
      sgNGCG
      sgNGCG_matches
      sgNGCG_spacing
      sgNNGRRT
      sgNNGRRT_matches
      sgNNGRRT_spacing
      sgNNNRRT
      sgNNNRRT_matches
      sgNNNRRT_spacing
    }
  }
`;
export const listFishs = /* GraphQL */ `
  query ListFishs(
    $filter: ModelFishFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFishs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        aa_target
        chr
        codon
        gene
        genome_coord
        id
        n_tx_in_gene
        no_upstream_G
        percent_NMD
        percent_tx
        rel_pos_largest_isoform
        strand
        rFLP_Gain
        rFLP_Loss
        sgNGA
        sgNGA_matches
        sgNGA_spacing
        sgNGG
        sgNGG_matches
        sgNGG_spacing
        sgNGAG
        sgNGAG_matches
        sgNGAG_spacing
        sgNGCG
        sgNGCG_matches
        sgNGCG_spacing
        sgNNGRRT
        sgNNGRRT_matches
        sgNNGRRT_spacing
        sgNNNRRT
        sgNNNRRT_matches
        sgNNNRRT_spacing
      }
      nextToken
    }
  }
`;
export const getMouse = /* GraphQL */ `
  query GetMouse($id: ID!) {
    getMouse(id: $id) {
      aa_target
      chr
      codon
      gene
      genome_cord
      id
      n_tx_in_gene
      no_upstream_G
      percent_NMD
      percent_tx
      rel_pos_largest_isoform
      rFLP_Gain
      rFLP_Loss
      sgNGG
      sgNGG_matches
      sgNGG_spacing
      sgNGA
      sgNGA_matches
      sgNGA_spacing
      sgNGAG
      sgNGAG_matches
      sgNGAG_spacing
      sgNGCG
      sgNGCG_matches
      sgNGCG_spacing
      sgNNGRRT
      sgNNGRRT_matches
      sgNNGRRT_spacing
      sgNNNRRT
      sgNNNRRT_matches
      sgNNNRRT_spacing
      strand
    }
  }
`;
export const listMouses = /* GraphQL */ `
  query ListMouses(
    $filter: ModelMouseFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMouses(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        aa_target
        chr
        codon
        gene
        genome_cord
        id
        n_tx_in_gene
        no_upstream_G
        percent_NMD
        percent_tx
        rel_pos_largest_isoform
        rFLP_Gain
        rFLP_Loss
        sgNGG
        sgNGG_matches
        sgNGG_spacing
        sgNGA
        sgNGA_matches
        sgNGA_spacing
        sgNGAG
        sgNGAG_matches
        sgNGAG_spacing
        sgNGCG
        sgNGCG_matches
        sgNGCG_spacing
        sgNNGRRT
        sgNNGRRT_matches
        sgNNGRRT_spacing
        sgNNNRRT
        sgNNNRRT_matches
        sgNNNRRT_spacing
        strand
      }
      nextToken
    }
  }
`;
export const getFly = /* GraphQL */ `
  query GetFly($id: ID!) {
    getFly(id: $id) {
      aa_target
      chr
      codon
      gene
      genome_coord
      id
      n_tx_in_gene
      no_upstream_G
      percent_NMD
      percent_tx
      rel_pos_largest_isoform
      rFLP_Gain
      rFLP_Loss
      sgNGG
      sgNGG_matches
      sgNGG_spacing
      sgNGA
      sgNGA_matches
      sgNGA_spacing
      sgNGAG
      sgNGAG_matches
      sgNGAG_spacing
      sgNGCG
      sgNGCG_matches
      sgNGCG_spacing
      sgNNGRRT
      sgNNGRRT_matches
      sgNNGRRT_spacing
      sgNNNRRT
      sgNNNRRT_matches
      sgNNNRRT_spacing
      strand
    }
  }
`;
export const listFlys = /* GraphQL */ `
  query ListFlys(
    $filter: ModelFlyFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFlys(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        aa_target
        chr
        codon
        gene
        genome_coord
        id
        n_tx_in_gene
        no_upstream_G
        percent_NMD
        percent_tx
        rel_pos_largest_isoform
        rFLP_Gain
        rFLP_Loss
        sgNGG
        sgNGG_matches
        sgNGG_spacing
        sgNGA
        sgNGA_matches
        sgNGA_spacing
        sgNGAG
        sgNGAG_matches
        sgNGAG_spacing
        sgNGCG
        sgNGCG_matches
        sgNGCG_spacing
        sgNNGRRT
        sgNNGRRT_matches
        sgNNGRRT_spacing
        sgNNNRRT
        sgNNNRRT_matches
        sgNNNRRT_spacing
        strand
      }
      nextToken
    }
  }
`;
export const getNematode = /* GraphQL */ `
  query GetNematode($id: ID!) {
    getNematode(id: $id) {
      aa_target
      chr
      codon
      genome_coord
      id
      n_tx_in_gene
      no_upstream_G
      percent_NMD
      percent_tx
      rel_pos_largest_isoform
      rFLP_Gain
      rFLP_Loss
      sgNGG
      sgNGG_matches
      sgNGG_spacing
      sgNGA
      sgNGA_matches
      sgNGA_spacing
      sgNGAG
      sgNGAG_matches
      sgNGAG_spacing
      sgNGCG
      sgNGCG_matches
      sgNGCG_spacing
      sgNNGRRT
      sgNNGRRT_matches
      sgNNGRRT_spacing
      sgNNNRRT
      sgNNNRRT_matches
      sgNNNRRT_spacing
      gene
    }
  }
`;
export const listNematodes = /* GraphQL */ `
  query ListNematodes(
    $filter: ModelNematodeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNematodes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        aa_target
        chr
        codon
        genome_coord
        id
        n_tx_in_gene
        no_upstream_G
        percent_NMD
        percent_tx
        rel_pos_largest_isoform
        rFLP_Gain
        rFLP_Loss
        sgNGG
        sgNGG_matches
        sgNGG_spacing
        sgNGA
        sgNGA_matches
        sgNGA_spacing
        sgNGAG
        sgNGAG_matches
        sgNGAG_spacing
        sgNGCG
        sgNGCG_matches
        sgNGCG_spacing
        sgNNGRRT
        sgNNGRRT_matches
        sgNNGRRT_spacing
        sgNNNRRT
        sgNNNRRT_matches
        sgNNNRRT_spacing
        gene
      }
      nextToken
    }
  }
`;
export const getPlant = /* GraphQL */ `
  query GetPlant($id: ID!) {
    getPlant(id: $id) {
      aa_target
      chr
      codon
      gene
      genome_coord
      id
      n_tx_in_gene
      no_upstream_G
      percent_NMD
      percent_tx
      rel_pos_largest_isoform
      rFLP_Loss
      rFLP_Gain
      sgNGG
      sgNGG_matches
      sgNGG_spacing
      sgNGA
      sgNGA_matches
      sgNGA_spacing
      sgNGAG
      sgNGAG_matches
      sgNGAG_spacing
      sgNGCG
      sgNGCG_matches
      sgNGCG_spacing
      sgNNGRRT
      sgNNGRRT_matches
      sgNNGRRT_spacing
      sgNNNRRT
      sgNNNRRT_matches
      sgNNNRRT_spacing
      strand
    }
  }
`;
export const listPlants = /* GraphQL */ `
  query ListPlants(
    $filter: ModelPlantFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPlants(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        aa_target
        chr
        codon
        gene
        genome_coord
        id
        n_tx_in_gene
        no_upstream_G
        percent_NMD
        percent_tx
        rel_pos_largest_isoform
        rFLP_Loss
        rFLP_Gain
        sgNGG
        sgNGG_matches
        sgNGG_spacing
        sgNGA
        sgNGA_matches
        sgNGA_spacing
        sgNGAG
        sgNGAG_matches
        sgNGAG_spacing
        sgNGCG
        sgNGCG_matches
        sgNGCG_spacing
        sgNNGRRT
        sgNNGRRT_matches
        sgNNGRRT_spacing
        sgNNNRRT
        sgNNNRRT_matches
        sgNNNRRT_spacing
        strand
      }
      nextToken
    }
  }
`;
export const getRat = /* GraphQL */ `
  query GetRat($id: ID!) {
    getRat(id: $id) {
      aa_target
      chr
      codon
      gene
      genome_coord
      id
      n_tx_in_gene
      no_upstream_G
      percent_NMD
      percent_tx
      rel_pos_largest_isoform
      rFLP_Gain
      rFLP_Loss
      sgNGG
      sgNGG_matches
      sgNGG_spacing
      sgNGA
      sgNGA_matches
      sgNGA_spacing
      sgNGAG
      sgNGAG_matches
      sgNGAG_spacing
      sgNGCG
      sgNGCG_matches
      sgNGCG_spacing
      sgNNGRRT
      sgNNGRRT_matches
      sgNNGRRT_spacing
      sgNNNRRT
      sgNNNRRT_matches
      sgNNNRRT_spacing
      strand
    }
  }
`;
export const listRats = /* GraphQL */ `
  query ListRats(
    $filter: ModelRatFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRats(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        aa_target
        chr
        codon
        gene
        genome_coord
        id
        n_tx_in_gene
        no_upstream_G
        percent_NMD
        percent_tx
        rel_pos_largest_isoform
        rFLP_Gain
        rFLP_Loss
        sgNGG
        sgNGG_matches
        sgNGG_spacing
        sgNGA
        sgNGA_matches
        sgNGA_spacing
        sgNGAG
        sgNGAG_matches
        sgNGAG_spacing
        sgNGCG
        sgNGCG_matches
        sgNGCG_spacing
        sgNNGRRT
        sgNNGRRT_matches
        sgNNGRRT_spacing
        sgNNNRRT
        sgNNNRRT_matches
        sgNNNRRT_spacing
        strand
      }
      nextToken
    }
  }
`;
export const getAlias = /* GraphQL */ `
  query GetAlias($id: ID!) {
    getAlias(id: $id) {
      id
      alias
      gene
      speciesName
    }
  }
`;
export const listAliass = /* GraphQL */ `
  query ListAliass(
    $filter: ModelAliasFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAliass(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        alias
        gene
        speciesName
      }
      nextToken
    }
  }
`;
export const getGeneLollipopGraph = /* GraphQL */ `
  query GetGeneLollipopGraph($id: ID!) {
    getGeneLollipopGraph(id: $id) {
      id
      transcriptId
      transcriptId2
      numberOfAAS
      lollipopLocations {
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
export const listGeneLollipopGraphs = /* GraphQL */ `
  query ListGeneLollipopGraphs(
    $filter: ModelGeneLollipopGraphFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGeneLollipopGraphs(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        transcriptId
        transcriptId2
        numberOfAAS
        lollipopLocations {
          nextToken
        }
        domains {
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const getLollipopLocations = /* GraphQL */ `
  query GetLollipopLocations($id: ID!) {
    getLollipopLocations(id: $id) {
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
  }
`;
export const listLollipopLocationss = /* GraphQL */ `
  query ListLollipopLocationss(
    $filter: ModelLollipopLocationsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLollipopLocationss(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
`;
export const getDomain = /* GraphQL */ `
  query GetDomain($id: ID!) {
    getDomain(id: $id) {
      id
      accessionNumber
      type
      start
      end
      gene
      identifier
      color
    }
  }
`;
export const listDomains = /* GraphQL */ `
  query ListDomains(
    $filter: ModelDomainFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDomains(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
`;
export const getAuth = /* GraphQL */ `
  query GetAuth($id: ID!) {
    getAuth(id: $id) {
      id
    }
  }
`;
export const listAuths = /* GraphQL */ `
  query ListAuths(
    $filter: ModelAuthFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAuths(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
      }
      nextToken
    }
  }
`;
export const gene = /* GraphQL */ `
  query Gene(
    $gene: String
    $sortDirection: ModelSortDirection
    $filter: ModelHomoSapiensFilterInput
    $limit: Int
    $nextToken: String
  ) {
    gene(
      gene: $gene
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        aa_target
        chr
        codon
        gene
        genome_coord
        id
        n_tx_in_gene
        no_upstream_G
        percent_NMD
        percent_tx
        rel_pos_largest_isoform
        rFLP_Gain
        rFLP_Loss
        sgNGA
        sgNGA_matches
        sgNGA_spacing
        sgNGG
        sgNGG_matches
        sgNGG_spacing
        sgNGAG
        sgNGAG_matches
        sgNGAG_spacing
        sgNGCG
        sgNGCG_matches
        sgNGCG_spacing
        sgNNGRRT
        sgNNGRRT_matches
        sgNNGRRT_spacing
        sgNNNRRT
        sgNNNRRT_matches
        sgNNNRRT_spacing
        strand
        cancer_type
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const newCancerType = /* GraphQL */ `
  query NewCancerType(
    $cancer_type: String
    $sortDirection: ModelSortDirection
    $filter: ModelHomoSapiensFilterInput
    $limit: Int
    $nextToken: String
  ) {
    newCancerType(
      cancer_type: $cancer_type
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        aa_target
        chr
        codon
        gene
        genome_coord
        id
        n_tx_in_gene
        no_upstream_G
        percent_NMD
        percent_tx
        rel_pos_largest_isoform
        rFLP_Gain
        rFLP_Loss
        sgNGA
        sgNGA_matches
        sgNGA_spacing
        sgNGG
        sgNGG_matches
        sgNGG_spacing
        sgNGAG
        sgNGAG_matches
        sgNGAG_spacing
        sgNGCG
        sgNGCG_matches
        sgNGCG_spacing
        sgNNGRRT
        sgNNGRRT_matches
        sgNNGRRT_spacing
        sgNNNRRT
        sgNNNRRT_matches
        sgNNNRRT_spacing
        strand
        cancer_type
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const geneYeast = /* GraphQL */ `
  query GeneYeast(
    $gene: String
    $sortDirection: ModelSortDirection
    $filter: ModelYeastFilterInput
    $limit: Int
    $nextToken: String
  ) {
    geneYeast(
      gene: $gene
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        aa_target
        chr
        codon
        gene
        genome_coord
        id
        n_tx_in_gene
        no_upstream_G
        percent_NMD
        percent_tx
        rel_pos_largest_isoform
        rFLP_Loss
        rFLP_Gain
        sgNGA
        sgNGA_matches
        sgNGA_spacing
        sgNGG
        sgNGG_matches
        sgNGG_spacing
        sgNGAG
        sgNGAG_matches
        sgNGAG_spacing
        sgNGCG
        sgNGCG_matches
        sgNGCG_spacing
        sgNNGRRT
        sgNNGRRT_matches
        sgNNGRRT_spacing
        sgNNNRRT
        sgNNNRRT_matches
        sgNNNRRT_spacing
        strand
      }
      nextToken
    }
  }
`;
export const geneFish = /* GraphQL */ `
  query GeneFish(
    $gene: String
    $sortDirection: ModelSortDirection
    $filter: ModelFishFilterInput
    $limit: Int
    $nextToken: String
  ) {
    geneFish(
      gene: $gene
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        aa_target
        chr
        codon
        gene
        genome_coord
        id
        n_tx_in_gene
        no_upstream_G
        percent_NMD
        percent_tx
        rel_pos_largest_isoform
        strand
        rFLP_Gain
        rFLP_Loss
        sgNGA
        sgNGA_matches
        sgNGA_spacing
        sgNGG
        sgNGG_matches
        sgNGG_spacing
        sgNGAG
        sgNGAG_matches
        sgNGAG_spacing
        sgNGCG
        sgNGCG_matches
        sgNGCG_spacing
        sgNNGRRT
        sgNNGRRT_matches
        sgNNGRRT_spacing
        sgNNNRRT
        sgNNNRRT_matches
        sgNNNRRT_spacing
      }
      nextToken
    }
  }
`;
export const geneMouse = /* GraphQL */ `
  query GeneMouse(
    $gene: String
    $sortDirection: ModelSortDirection
    $filter: ModelMouseFilterInput
    $limit: Int
    $nextToken: String
  ) {
    geneMouse(
      gene: $gene
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        aa_target
        chr
        codon
        gene
        genome_cord
        id
        n_tx_in_gene
        no_upstream_G
        percent_NMD
        percent_tx
        rel_pos_largest_isoform
        rFLP_Gain
        rFLP_Loss
        sgNGG
        sgNGG_matches
        sgNGG_spacing
        sgNGA
        sgNGA_matches
        sgNGA_spacing
        sgNGAG
        sgNGAG_matches
        sgNGAG_spacing
        sgNGCG
        sgNGCG_matches
        sgNGCG_spacing
        sgNNGRRT
        sgNNGRRT_matches
        sgNNGRRT_spacing
        sgNNNRRT
        sgNNNRRT_matches
        sgNNNRRT_spacing
        strand
      }
      nextToken
    }
  }
`;
export const geneFly = /* GraphQL */ `
  query GeneFly(
    $gene: String
    $sortDirection: ModelSortDirection
    $filter: ModelFlyFilterInput
    $limit: Int
    $nextToken: String
  ) {
    geneFly(
      gene: $gene
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        aa_target
        chr
        codon
        gene
        genome_coord
        id
        n_tx_in_gene
        no_upstream_G
        percent_NMD
        percent_tx
        rel_pos_largest_isoform
        rFLP_Gain
        rFLP_Loss
        sgNGG
        sgNGG_matches
        sgNGG_spacing
        sgNGA
        sgNGA_matches
        sgNGA_spacing
        sgNGAG
        sgNGAG_matches
        sgNGAG_spacing
        sgNGCG
        sgNGCG_matches
        sgNGCG_spacing
        sgNNGRRT
        sgNNGRRT_matches
        sgNNGRRT_spacing
        sgNNNRRT
        sgNNNRRT_matches
        sgNNNRRT_spacing
        strand
      }
      nextToken
    }
  }
`;
export const geneNematode = /* GraphQL */ `
  query GeneNematode(
    $gene: String
    $sortDirection: ModelSortDirection
    $filter: ModelNematodeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    geneNematode(
      gene: $gene
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        aa_target
        chr
        codon
        genome_coord
        id
        n_tx_in_gene
        no_upstream_G
        percent_NMD
        percent_tx
        rel_pos_largest_isoform
        rFLP_Gain
        rFLP_Loss
        sgNGG
        sgNGG_matches
        sgNGG_spacing
        sgNGA
        sgNGA_matches
        sgNGA_spacing
        sgNGAG
        sgNGAG_matches
        sgNGAG_spacing
        sgNGCG
        sgNGCG_matches
        sgNGCG_spacing
        sgNNGRRT
        sgNNGRRT_matches
        sgNNGRRT_spacing
        sgNNNRRT
        sgNNNRRT_matches
        sgNNNRRT_spacing
        gene
      }
      nextToken
    }
  }
`;
export const genePlant = /* GraphQL */ `
  query GenePlant(
    $gene: String
    $sortDirection: ModelSortDirection
    $filter: ModelPlantFilterInput
    $limit: Int
    $nextToken: String
  ) {
    genePlant(
      gene: $gene
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        aa_target
        chr
        codon
        gene
        genome_coord
        id
        n_tx_in_gene
        no_upstream_G
        percent_NMD
        percent_tx
        rel_pos_largest_isoform
        rFLP_Loss
        rFLP_Gain
        sgNGG
        sgNGG_matches
        sgNGG_spacing
        sgNGA
        sgNGA_matches
        sgNGA_spacing
        sgNGAG
        sgNGAG_matches
        sgNGAG_spacing
        sgNGCG
        sgNGCG_matches
        sgNGCG_spacing
        sgNNGRRT
        sgNNGRRT_matches
        sgNNGRRT_spacing
        sgNNNRRT
        sgNNNRRT_matches
        sgNNNRRT_spacing
        strand
      }
      nextToken
    }
  }
`;
export const geneRat = /* GraphQL */ `
  query GeneRat(
    $gene: String
    $sortDirection: ModelSortDirection
    $filter: ModelRatFilterInput
    $limit: Int
    $nextToken: String
  ) {
    geneRat(
      gene: $gene
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        aa_target
        chr
        codon
        gene
        genome_coord
        id
        n_tx_in_gene
        no_upstream_G
        percent_NMD
        percent_tx
        rel_pos_largest_isoform
        rFLP_Gain
        rFLP_Loss
        sgNGG
        sgNGG_matches
        sgNGG_spacing
        sgNGA
        sgNGA_matches
        sgNGA_spacing
        sgNGAG
        sgNGAG_matches
        sgNGAG_spacing
        sgNGCG
        sgNGCG_matches
        sgNGCG_spacing
        sgNNGRRT
        sgNNGRRT_matches
        sgNNGRRT_spacing
        sgNNNRRT
        sgNNNRRT_matches
        sgNNNRRT_spacing
        strand
      }
      nextToken
    }
  }
`;
export const byAlias = /* GraphQL */ `
  query ByAlias(
    $alias: String
    $sortDirection: ModelSortDirection
    $filter: ModelAliasFilterInput
    $limit: Int
    $nextToken: String
  ) {
    byAlias(
      alias: $alias
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        alias
        gene
        speciesName
      }
      nextToken
    }
  }
`;
