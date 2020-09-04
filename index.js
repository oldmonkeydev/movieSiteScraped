const express = require('express');

const scraper = require('./scraper');

const cors = require('cors');

const app = express();
app.use(cors());

app.get('/', (req, res) => {
    res.json({
        message: 'ready to scrape'
    });
});

//search method
// example: /search/friends
app.get('/search/:title', (req, res) => {
    scraper.searchMovies(req.params.title)
    .then(movies => {
        res.json(movies);
    })
});

//get movie link 
//example /movie/we-are-your-friends/
app.get('/movie/:link', (req, res) => {
    scraper.getMovie(req.params.link)
    .then(movie => {
        res.json(movie);
    })
});
app.get('/home/', (req, res) => {
    scraper.getHome()
    .then(home => {
        res.json(home);
    })
});

const port = process.env.port || 3000;
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});



