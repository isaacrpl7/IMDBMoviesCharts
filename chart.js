import imdb_data from './imdb_data.json' assert { "type": "json" };
import {ordered_countries, region_colors, getIndex} from './ordered_countries.js'
const chart = document.getElementById('imdb-chart');

const CANVAS_WIDTH = chart.clientWidth;
const CANVAS_HEIGHT = chart.clientHeight;

//const grosses = imdb_data.map((movie) => movie.gross?movie.gross:null).sort((a, b) => b - a)
let imdb_data_grosspercent = imdb_data.map((movie) => {
    let gross_percent = movie.gross/2847246203
    gross_percent = Math.round((gross_percent + Number.EPSILON) * 100) / 100
    return {...movie, gross: gross_percent}
})


imdb_data_grosspercent = imdb_data_grosspercent.map((movie) => {
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

imdb_data_grosspercent = imdb_data_grosspercent.sort((a, b) => a.year - b.year)
const colors = [
    ["#e38d8d", "#b06666", "#875151", "#633c3c"], 
    ["#90f0d9", "#5ab09c", "#29856f", "#0e5c49"]
]

if (chart.getContext) {
    const ctx = chart.getContext("2d");
    let x = 0;
    let ano_atual = 1980;

    // Inicializa gráfico
    let start_region = 0;
    ordered_countries.forEach((region, index) => {
        ctx.globalAlpha = 0.3;
        ctx.fillStyle = region_colors[index]
        const region_height = Math.round(region.length * (CANVAS_HEIGHT/59))
        ctx.fillRect(0, start_region, CANVAS_WIDTH, region_height);
        start_region += region_height;
    });

    let color = 0
    ctx.fillStyle = colors[color][0]
    imdb_data_grosspercent.forEach((movie) => {
        
        if(movie.gross !== null && movie.gross > 0 && movie.country !== null) {
            // Desenhar barra vertical
            const height = movie.gross * CANVAS_HEIGHT;
            const y = (CANVAS_HEIGHT - height) / 2;
            if(movie.year > ano_atual) {
                color = color?0:1
                ano_atual = movie.year;
            }
            ctx.fillStyle = colors[color][movie.runtime]
            ctx.fillRect(x++, y, 1, height);

            // Desenhar ponto indicando nacionalidade
            ctx.globalAlpha = 1;
            let country_index = getIndex(movie.country)
            ctx.fillStyle = 'black'
            ctx.fillRect(x++, country_index * (CANVAS_HEIGHT/59), 2, 2);
        }
    });
}

console.log(imdb_data_grosspercent)