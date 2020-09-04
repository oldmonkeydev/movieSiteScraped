const movieID = window.location.search.substr(9);

const divTitlenDescription = document.querySelector('#titlendescription');

const slide = document.querySelector('.slide');

const background = document.querySelector('.banner');

const trailer = document.querySelector('.trailer');

const baseUrl = 'https://movie-site-scraped.oldmonkeydev.vercel.app';


function getMovie(movieID){
    return fetch(`${baseUrl}/movie/${movieID}`)
    .then(res => res.json());
}

function showMovie(movie){
    const title = document.createElement('h2');
    title.textContent = movie.title;

    const description = document.createElement('p');
    description.innerHTML = movie.description;

    divTitlenDescription.appendChild(title);
    divTitlenDescription.appendChild(description);

    slide.style.background = "url('"+movie.poster+"')";
    background.style.backgroundImage = "url('"+movie.backgroundMovieTmp+"')";

    const iframe = document.createElement('iframe');
    iframe.width = "640"; iframe.height = "360";
    iframe.src = movie.videoLink;
    trailer.appendChild(iframe);
   

}

getMovie(movieID)
.then(showMovie);