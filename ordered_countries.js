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
    "#272932",
    "#4D7EA8",
    "#828489",
    "#9E90A2",
    "#B6C2D9",
    "#ae69d6"
]

export const getIndex = (country) => {
    /** Change color according to region */
    const country_index = ordered_countries.flat().indexOf(country);
    return country_index
}