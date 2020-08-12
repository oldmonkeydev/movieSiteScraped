const fetch = require('node-fetch');
const cheerio = require('cheerio');
const { text } = require('express');

const url = 'https://www.peliculasflv.to/buscar/';

const urlMovie = 'https://www.peliculasflv.to/pelicula/';

const tmp = '/';

const movieCache = {};

const searchCache = {};

function searchMovies(searchTerm){
    if(searchCache[searchTerm]){
        console.log('serving from cache: ',{searchTerm});
        return Promise.resolve(searchCache[searchTerm]);
    }
    return fetch(`${url}${searchTerm}${tmp}`)
    .then(response => response.text()
    .then(body => {
        const movies = [];
        const $ = cheerio.load(body);
        $('.list-wrapper article').each(
            function(i, element){
    
                const $element = $(element);
    
                const $image = $element.find('.poster img');
                    
                const $title = $element.find('.title h2');

                const $year = $element.find('.year');

                const $link = $element.find('a');
        
                const movie = {
                    image: $image.attr('src'),
    
                    title: $title.text(),

                    year: $year.text().trim(),

                    link: $link.attr('href').substr(37)              
                };
                movies.push(movie);
            }
            
        );
        searchCache[searchTerm] = movies;
        return movies;
    })
    );
}

function getMovie(link){
    if(movieCache[link]){
        console.log('serving from cache: ',{link});
        return Promise.resolve(movieCache[link]);
    }
    return fetch(`${urlMovie}${link}`)
    .then(response => response.text())
    .then(body => {

        const $ = cheerio.load(body);

        const title = $('.info .title h1').text();

        const description = $('.description').text().trim(); // hacer trim

        const poster = $('.poster img').attr('src');

        const backgroundMovieTmp = $('.background-movie').attr('style').substr(17).slice(0,-36);

        const videoLink = $('.trailer iframe').attr('src');

        const originalTitle = $('.sec div:nth-child(1) p').text().substr(17);

        const releasedDate = $('.sec div:nth-child(3) p').text().trim().substr(17);

        const genres = [];
        $('.sec div:nth-child(4) ul li').each(function(i, element){
            const genre = $(element).text().substr(2);
            genres.push(genre);
        });
        const languages = [];
        $('.sec div:nth-child(5) ul li').each(function(i, element){
            const language = $(element).text().substr(2);
            languages.push(language);
        });


        const movie = 
        {
            title: title,

            description: description,

            poster: poster,

            backgroundMovieTmp: backgroundMovieTmp,

            videoLink: videoLink,

            originalTitle: originalTitle,

            releasedDate: releasedDate,

            genres: genres,

            languages: languages
        }
        console.log(movie);
        movieCache[link] = movie;
        return movie;
    })
}
//getMovie('the-speed-cubers/');



module.exports = {
    searchMovies,
    getMovie
};
