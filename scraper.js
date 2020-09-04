const fetch = require('node-fetch');
const cheerio = require('cheerio');
const { text, response } = require('express');

const baseUrl = 'https://www.peliculasflv.to/';

const url = 'https://www.peliculasflv.to/buscar/';

const urlMovie = 'https://www.peliculasflv.to/pelicula/';

const tmp = '/';

const flag = false;

const movieCache = {};

const searchCache = {};


function getHome(){
    return fetch(`${baseUrl}`)
    .then(response => response.text()
    .then(body => {
        var home = [];
        const $ = cheerio.load(body);

        const background = $('.slider-item-wrapper').attr('style').substr(17).slice(0,-36);;

        const reff = $("#main-slider div .swiper-wrapper  div div .slider-item-content div .buttons a").attr('href').substr(37);

        const poster = $('#main-slider div .swiper-wrapper  div div div.slider-item-poster div a img').attr('src');

        const title = reff.substr(0,reff.length - 1);

        const description = $("#main-slider div .swiper-wrapper .swiper-slide.swiper-slide div div .slider-item-content div .description").text().split(/\r?\n/)[2].trim()

        const time = $("#main-slider div .swiper-wrapper  div div .slider-item-content div .extra p:nth-child(1)").text().substr(60);

        const firstMovieImg = $("#home .list.ls .content-list div div :nth-child(1) a .content .poster img").attr('src');

        const firstMovieRef = $("#home .list.ls .content-list div div :nth-child(1) a").attr('href').substr(37);
        
        const secondMovieImg = $("#home .list.ls .content-list div div :nth-child(2) a .content .poster img").attr('src');

        const secondMovieRef = $("#home .list.ls .content-list div div :nth-child(2) a").attr('href').substr(37);

        const thirdMovieImg = $("#home .list.ls .content-list div div :nth-child(3) a .content .poster img").attr('src');

        const thisrdMovieRef = $("#home .list.ls .content-list div div :nth-child(3) a").attr('href').substr(37);

        const fourthMovieImg = $("#home .list.ls .content-list div div :nth-child(4) a .content .poster img").attr('src');

        const fourthMovieRef = $("#home .list.ls .content-list div div :nth-child(4) a").attr('href').substr(37);

        const fivethMovieImg = $("#home .list.ls .content-list div div :nth-child(5) a .content .poster img").attr('src');

        const fivethMovieRef = $("#home .list.ls .content-list div div :nth-child(5) a").attr('href').substr(37);

        const sixthMovieImg = $("#home .list.ls .content-list div div :nth-child(6) a .content .poster img").attr('src');

        const sixthMovieRef = $("#home .list.ls .content-list div div :nth-child(6) a").attr('href').substr(37);

        home = {
            background : background,
            reff : reff,
            poster : poster,
            title : title,
            description : description,
            time : time,
            firstMovieImg : firstMovieImg,
            firstMovieRef : firstMovieRef,
            secondMovieImg : secondMovieImg,
            secondMovieRef : secondMovieRef,
            thirdMovieImg : thirdMovieImg,
            thisrdMovieRef : thisrdMovieRef,
            fourthMovieImg : fourthMovieImg,
            fourthMovieRef : fourthMovieRef,
            fivethMovieImg : fivethMovieImg,
            fivethMovieRef : fivethMovieRef,
            sixthMovieImg : sixthMovieImg,
            sixthMovieRef : sixthMovieRef

        }
        console.log(home);
        return home;

    }));
}

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
//getHome();
//getMovie('the-speed-cubers/');



module.exports = {
    searchMovies,
    getMovie,
    getHome
};
