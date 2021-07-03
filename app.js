const express = require('express')
// import handlebars
const exphbs = require('express-handlebars')
// import movie info from outter resource
const movies = require('./movieList.json')
const app = express()
const port = 3000

// setting express template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index', { movies: movies.results })
})

app.get('/movies/:movie_id', (req, res) => {
  const showMovie = movies.results.filter(item => item.id.toString() === req.params.movie_id)[0]
  console.log(showMovie.id)
  res.render('show', { movies: showMovie })
})

// search function
app.get('/search', (req, res) => {
  const filteredmovies = movies.results.filter(item => item.title.toLowerCase().includes(req.query.keywords.toLowerCase()))
  res.render('index', { movies: filteredmovies, keyword: req.query.keywords })
})

app.listen(port, () => {
  console.log('online')
})