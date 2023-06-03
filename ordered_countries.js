export const ordered_countries = [
    // Asia
    ["Taiwan",
    "Lebanon",
    "Thailand",
    "Soviet Union",
    "Indonesia",
    "South Korea",
    "India",
    "Iran",
    "Vietnam",
    "Israel",
    "Hong Kong",
    "Japan",
    "Philippines",
    "Turkey",
    "Russia",
    "China",
    "United Arab Emirates",],

    // Europe
    ["Federal Republic of Yugoslavia",
    "Italy",
    "Czech Republic",
    "Sweden",
    "United Kingdom",
    "Germany",
    "Ireland",
    "Finland",
    "Portugal",
    "Malta",
    "Greece",
    "West Germany",
    "France",
    "Iceland",
    "Yugoslavia",
    "Denmark",
    "Switzerland",
    "Hungary",
    "Republic of Macedonia",
    "Norway",
    "Netherlands",
    "Romania",
    "Austria",
    "Serbia",
    "Spain",
    "Belgium",
    "Poland",],

    // North America
    ["Canada",
    "Jamaica",
    "United States",
    "Panama",
    "Mexico",],

    // South America
    ["Colombia",
    "Argentina",
    "Chile",
    "Brazil",
    "Aruba",],

    // Oceania
    ["Australia",
    "New Zealand",],

    // Africa
    ["South Africa",
    "Kenya",
    "Libya",]
]

export const region_colors = [
    "#ededed",
    "#ffffff",
    "#ededed",
    "#ffffff",
    "#ededed",
    "#ffffff"
]

export const getIndex = (country) => {
    /** Change color according to region */
    const country_index = ordered_countries.flat().indexOf(country);
    return country_index
}

export const getIndexInRegion = (country) => {
    let index = -1;
    ordered_countries.forEach((region) => {
        if(region.indexOf(country) !== -1){
            index = region.indexOf(country);
        }
    })
    return index;
}

export const getRegionSize = (region) => {
    switch(region) {
        case 'ASIA':
            return ordered_countries[0].length
        case 'EUROPE':
            return ordered_countries[1].length
        case 'NORTH AMERICA':
            return ordered_countries[2].length
        case 'SOUTH AMERICA':
            return ordered_countries[3].length
        case 'OCEANIA':
            return ordered_countries[4].length
        case 'AFRICA':
            return ordered_countries[5].length
        default:
            return 0
    }
}

export const getRegion = (country) => {
    let region_number = null;
    ordered_countries.forEach((region, index) => {
        if(region.indexOf(country) !== -1){
            region_number = index;
        }
    })
    
    switch(region_number) {
        case 0:
            return 'ASIA'
        case 1:
            return 'EUROPE'
        case 2:
            return 'NORTH AMERICA'
        case 3:
            return 'SOUTH AMERICA'
        case 4:
            return 'OCEANIA'
        case 5:
            return 'AFRICA'
        default:
            return ''
    }
}