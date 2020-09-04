const form = document.querySelector('form');

const searchInput = document.querySelector('input');

const resultList = document.querySelector('.owl-carousel');

const baseUrl = 'https://movie-site-scraped.oldmonkeydev.vercel.app';


form.addEventListener('submit', formSubmitted);

function formSubmitted(event){
    event.preventDefault();

    const searchTerm = searchInput.value;

    getSearchResults(searchTerm)
    .then(showResults);
    
}


function getSearchResults(searchTerm){
    return fetch(`${baseUrl}/search/${searchTerm}`)
    .then(res => res.json());
    
}
function showResults(results){
    results.forEach(movie => {
        const item = document.createElement('div');
        item.id = "parent"
        item.className = "ml-2 mr-2 parent-style";

        

        const a = document.createElement('a');
        a.href = '/frontend/movie.html?movieID=' + movie.link;

        const img = document.createElement('img');
        img.className = "card-img";
        img.src = movie.image;
        a.appendChild(img);
        item.appendChild(a);
        resultList.appendChild(item);

    });
    $('.owl-carousel').owlCarousel({
        loop:true,
        margin:10,
        nav:true,
        lazyLoad: true,
        responsiveClass:true,
        responsive:{
        0:{
            items:2,
            nav:true
        },
        600:{
            items:5,
            nav:false
        },
        1000:{
            items:7,
            nav:true,
            loop:false
        }
    } 
    });
}