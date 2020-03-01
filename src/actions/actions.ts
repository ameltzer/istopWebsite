import { action } from "typesafe-actions";

// use typescript enum rather than action constants
export enum actionTypes {
  SEARCH_GENES = "SEARCH_GENES",
  SEARCH_CANCER = "SEARCH_CANCER"
}

export const todoActions = {
  searchGenes: (item: string) => action(actionTypes.SEARCH_GENES, item),
  searchCancer: (idx: number) => action(actionTypes.SEARCH_CANCER, idx)
};
