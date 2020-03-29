import {FilterSearchState} from '../components/FilterSearch'

export function filterColumns(columns:string[], filterState:FilterSearchState) {
    if (!filterState) {
        console.log("short-circuiting filterColumns")
        return columns;
    }
    var localColumns:string[] = Array.from(columns)
    const pamMap:Map<string, boolean> = filterState.pam;
    if (pamActive(pamMap)) {
    pamMap.forEach((value: Boolean, key: string) => {
        if(!value) {
        localColumns = localColumns.filter(elem => elem!=key && elem!=(key+"_matches") && elem!=(key+"_spacing"))
        }
    })
    }

    return localColumns;
}


function pamActive (map:Map<string, boolean>) {
  var find:boolean = false;
  map.forEach((value: boolean, key: string) => {
    find = find || value
  })
  return find;
}

export function filterValues(values:object[], filteredColumns:string[], filterState:FilterSearchState) {
    if (!filterState) {
        return values;
    }
    var valuesCopy:object[] = Array.from(values)
    if (filterState.nmdPrediction) {
        valuesCopy = valuesCopy.filter(value => {
            return value["percent_NMD"] && parseFloat(value["percent_NMD"]) >=50
        }
        )
    }

    if (filterState.upstreamG) {
        valuesCopy = valuesCopy.filter(value => value["no_upstream_G"] && "true" === value["no_upstream_G"].trim().toLowerCase())
    }

    if (filterState.rflpAssay) {
        valuesCopy = valuesCopy.filter(value => (value["rFLP_Loss"] && value["rFLP_Loss"].length > 0) || (value["rFLP_Gain"] && value["rFLP_Gain"].length > 0) )
    }

    if (filterState.offTargetPrediction) {
        const keptOffTargetColumns:string[] = filteredColumns.filter(column => column.includes("_matches"))
        valuesCopy = valuesCopy.filter(value => keptOffTargetColumns.some(offTarget => value[offTarget] && value[offTarget].trim() == '0'))
    }
    return valuesCopy;
}