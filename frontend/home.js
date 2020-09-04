
const baseUrl = 'https://movie-site-scraped.oldmonkeydev.vercel.app';

const left_box = document.querySelector('#left-box');

const right_box = document.querySelector('#right-box');

const bodyid = document.querySelector('#body_id');

const movie1 = document.querySelector('#movie1');
const movie2 = document.querySelector('#movie2');
const movie3 = document.querySelector('#movie3');
const movie4 = document.querySelector('#movie4');
const movie5 = document.querySelector('#movie5');
const movie6 = document.querySelector('#movie6');

function getHome(){
    return fetch(`${baseUrl}/home/`)
    .then(res => res.json());
}

function showHome(home){
    bodyid.style.backgroundImage = "linear-gradient(rgba(0,0,0,0.8),rgba(0,0,0,0.8)),url('"+home.background+"')";
    const title = document.createElement('h1');
    title.innerHTML = home.title;

    const time = document.createElement('p');
    time.innerHTML = home.time;

    const description = document.createElement('p');
    description.innerHTML = home.description;

    const btn_play_icon = document.createElement('i');
    btn_play_icon.className = "fa fa-play";

    const ref_a = document.createElement('a');
    ref_a.href = '/frontend/movie.html?movieID=' + home.reff;
    ref_a.textContent = "Ver ahora";

    ref_a.appendChild(btn_play_icon);

    left_box.appendChild(title);
    left_box.appendChild(time);
    left_box.appendChild(description);
    left_box.appendChild(ref_a);

    const poster = document.createElement('img');
    poster.src = home.poster;
    poster.className = "movie-img";

    right_box.appendChild(poster);

    // img1
    const img1ref = document.createElement('a');
    img1ref.href = '/frontend/movie.html?movieID=' + home.firstMovieRef;

    const img1 = document.createElement('img');
    img1.src = home.firstMovieImg;

    img1ref.appendChild(img1);

    movie1.appendChild(img1ref);
    
    // img2
    const img2ref = document.createElement('a');
    img2ref.href = '/frontend/movie.html?movieID=' + home.secondMovieRef;

    const img2 = document.createElement('img');
    img2.src = home.secondMovieImg;

    img2ref.appendChild(img2);
    movie2.appendChild(img2ref);
    //img3
    const img3ref = document.createElement('a');
    img3ref.href = '/frontend/movie.html?movieID=' + home.thisrdMovieRef;

    const img3 = document.createElement('img');
    img3.src = home.thirdMovieImg;

    img3ref.appendChild(img3);
    movie3.appendChild(img3ref);

    // img4
    const img4ref = document.createElement('a');
    img4ref.href = '/frontend/movie.html?movieID=' + home.fourthMovieRef;

    const img4 = document.createElement('img');
    img4.src = home.fourthMovieImg;

    img4ref.appendChild(img4);
    movie4.appendChild(img4ref);
    // img5
    const img5ref = document.createElement('a');
    img5ref.href = '/frontend/movie.html?movieID=' + home.fivethMovieRef;

    const img5 = document.createElement('img');
    img5.src = home.fivethMovieImg;

    img5ref.appendChild(img5);
    movie5.appendChild(img5ref);
   // img6
    const img6ref = document.createElement('a');
    img6ref.href = '/frontend/movie.html?movieID=' + home.sixthMovieRef;

    const img6 = document.createElement('img');
    img6.src = home.sixthMovieImg;

    img6ref.appendChild(img6);
    movie6.appendChild(img6ref);
}
getHome()
.then(showHome);