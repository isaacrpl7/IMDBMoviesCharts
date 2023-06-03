import imdb_data from './imdb_data.json' assert { "type": "json" };
import {ordered_countries, region_colors, getIndex, getRegion, getRegionSize, getIndexInRegion} from './ordered_countries.js'

//const budgets = imdb_data.map((movie) => movie.budget?movie.budget:null).sort((a, b) => b - a)
const transformBudgetIntoPercentage = (imdb_data) => {
    return imdb_data.map((movie) => {
        let budget_percent = movie.budget/356000000
        budget_percent = Math.round((budget_percent + Number.EPSILON) * 100) / 100
        return {...movie, budget: budget_percent}
    })
}

const setRuntimeIntoInterval = (imdb_data) => {
    return imdb_data.map((movie) => {
        //let runtime_percent = (movie.runtime * (7/3110)) + (274/1555)
        // runtime_percent = Math.round((runtime_percent + Number.EPSILON) * 100) / 100
        // [55, 132.75]
        // [132.75, 210.5]
        // [210.5, 288.25]
        // [288.25, 366]
        let runtime_percent = 0;
        if (movie.runtime >= 55 && movie.runtime < 123.75) {
            runtime_percent = 0;
        } else if(movie.runtime >= 123.75 && movie.runtime < 210.5) {
            runtime_percent = 1;
        } else if(movie.runtime >= 210.5 && movie.runtime < 288.25){
            runtime_percent = 2;
        } else if(movie.runtime >= 288.25 && movie.runtime <= 366){
            runtime_percent = 3;
        }       
        
        return {...movie, runtime: runtime_percent}
    })
}

const separateDataByYear = (imdb_data) => {
    // Separando os dados por ano
    let data_per_year = [] // 2D array with the data in each year
    let data_in_a_year = []
    for(let i = 0; i < imdb_data.length-1; i++) {
        if(imdb_data[i].year === imdb_data[i+1].year) {
            data_in_a_year.push(imdb_data[i]);
        } else {
            data_in_a_year.push(imdb_data[i]);
            data_per_year.push(data_in_a_year);
            data_in_a_year = [];
        }
    }
    return data_per_year;
}

const orderEachYearByCountry = (data_per_year) => {
    // Ordenando, dentro de cada ano, os dados por nacionalidade
    data_per_year = data_per_year.map(year => {
        const movies = year.sort((a, b) => a.country.localeCompare(b.country))
        return [...movies]
    })

    return data_per_year.flat()
}

const makeChart = (chartID, imdb_data, region, bar_width) => {
    // Each line colors
    const colors = [
        ["#e38d8d", "#b06666", "#875151", "#633c3c"], 
        ["#90f0d9", "#5ab09c", "#29856f", "#0e5c49"]
    ]
    const chart = document.getElementById(chartID);
    const CANVAS_WIDTH = chart.clientWidth;
    const CANVAS_HEIGHT = chart.clientHeight;

    if (chart.getContext) {
        const ctx = chart.getContext("2d");
        let x = 0;
        let ano_atual = 1980;
    
        // Inicializa gráfico colorindo regioes diferentes
        // let start_region = 0;
        // ordered_countries.forEach((region, index) => {
        //     ctx.globalAlpha = 0.7;
        //     ctx.fillStyle = region_colors[index]
        //     const region_height = Math.round(region.length * (CANVAS_HEIGHT/59))
        //     ctx.fillRect(0, start_region, CANVAS_WIDTH, region_height);
        //     start_region += region_height;
        // });
        let color = 0
        ctx.fillStyle = colors[color][0]
        const region_size = getRegionSize(region);
        imdb_data.forEach((movie) => {
            if(movie.budget !== null && movie.budget > 0 && movie.country !== null && movie.country !== '' && getRegion(movie.country) === region) {
                // Desenhar barra vertical
                const height = movie.budget * CANVAS_HEIGHT;
                const y = (CANVAS_HEIGHT - height) / 2;
                if(movie.year > ano_atual) {
                    color = color?0:1
                    ano_atual = movie.year;
                }
                ctx.fillStyle = colors[color][movie.runtime]
                ctx.fillRect((x), y, bar_width, height);
    
                // Desenhar ponto indicando nacionalidade
                ctx.globalAlpha = 1;
                let country_index = getIndexInRegion(movie.country);
                ctx.fillStyle = 'black';
                const y_position = country_index * (CANVAS_HEIGHT/(region_size - 1));
                const countrySquareSize = bar_width === 1 ? 2 : bar_width; // Se o tamanho da barra fosse 1px, o quadrado ficaria mt pequeno, entao fiz o minimo do tamanho do quadrado ser 2px
                ctx.fillRect((x), y_position === 0 ? y_position : y_position - bar_width, countrySquareSize, countrySquareSize);

                x+=bar_width;
                x+=bar_width;
            }
        });
    }
}

let imdb_data_budgetpercent = transformBudgetIntoPercentage(imdb_data);
imdb_data_budgetpercent = setRuntimeIntoInterval(imdb_data_budgetpercent);

imdb_data_budgetpercent = imdb_data_budgetpercent.sort((a, b) => a.year - b.year)

let data_per_year = separateDataByYear(imdb_data_budgetpercent);
imdb_data_budgetpercent = orderEachYearByCountry(data_per_year);

makeChart('imdb-chart1', imdb_data_budgetpercent, 'ASIA', 8);
makeChart('imdb-chart2', imdb_data_budgetpercent, 'EUROPE', 2);
makeChart('imdb-chart3', imdb_data_budgetpercent, 'NORTH AMERICA', 1);
makeChart('imdb-chart4', imdb_data_budgetpercent, 'SOUTH AMERICA', 10);
makeChart('imdb-chart5', imdb_data_budgetpercent, 'OCEANIA',10);
makeChart('imdb-chart6', imdb_data_budgetpercent, 'AFRICA',10);

console.log(imdb_data_budgetpercent)